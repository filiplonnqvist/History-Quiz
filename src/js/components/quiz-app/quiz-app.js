import { RandomHistoricalFacts } from 'random-historical-facts'
import '../quiz-question/index.js'
import '../quiz-options/index.js'
import '../quiz-score/index.js'
import { quizApp } from './quiz-app-template.js'

customElements.define('quiz-app', class extends HTMLElement {
  #questionEl
  #optionsEl
  #scoreEl
  #viewQuestion
  #viewScore
  #errorEl

  #round = 0;
  #score = 0;
  #periods = [];
  #availableFacts = []
  #current = null;


  #facts = new RandomHistoricalFacts()

  static ROUNDS = 10;


  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(quizApp.content.cloneNode(true))

    this.#questionEl = this.shadowRoot.querySelector('quiz-question')
    this.#optionsEl = this.shadowRoot.querySelector('quiz-options')
    this.#scoreEl = this.shadowRoot.querySelector('quiz-score')
    this.#viewQuestion = this.shadowRoot.querySelector('#view-question')
    this.#viewScore = this.shadowRoot.querySelector('#view-score')
    this.#errorEl = this.shadowRoot.querySelector('#error')
  }

  /** 
   * Lifecycle method called when the element is added to the DOM.
   * Initiates the quiz and sets up event listeners.
   */
  async connectedCallback() {
    this.#start()
    this.#setupEventListeners()
  }

  async #start() {
    this.#resetQuizState()

    try {
      await this.#loadQuizData()
      await this.#next()
      this.#showQuestion()
    } catch (err) {
      this.#showError('Could not start quiz. Please try again.')
      console.error(err)
    }
  }

  #resetQuizState() {
    this.#hideAll()
    this.#errorEl.textContent = ''
    this.#round = 0
    this.#score = 0
  }

  #hideAll() {
    this.#viewQuestion.hidden = true
    this.#viewScore.hidden = true
    this.#errorEl.hidden = true
  }

  async #loadQuizData() {
    const allFacts = await this.#facts.getAllFacts()

    this.#periods = this.#extractAllPeriods(allFacts)
    this.#optionsEl.setOptions(this.#periods)

    this.#availableFacts = this.#extractRandomFacts(allFacts)
  }

  #extractAllPeriods(allFacts) {
    const periods = new Set(
      allFacts
        .filter(f => f.period)
        .map(f => f.period)
    )

    if (periods.size === 0) {
      throw new Error('No periods available.')
    }

    return Array.from(periods)
  }

  #extractRandomFacts(allFacts) {
    const factsWithPeriod = allFacts.filter(f => f.period)

    // Shuffle with Fisher-Yates
    for (let i = factsWithPeriod.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [factsWithPeriod[i], factsWithPeriod[j]] = [factsWithPeriod[j], factsWithPeriod[i]]
    }

    return factsWithPeriod.slice(0, this.constructor.ROUNDS)
  }

  #next() {
    this.#optionsEl.setButtonsDisabled(true)

    if (this.#availableFacts.length === 0) {
      throw new Error('No more facts available')
    }

    const item = this.#availableFacts.pop()
    const mapped = this.#mapFact(item)
    this.#current = mapped

    this.#questionEl.setFact({ fact: mapped.text, imageUrl: mapped.imageUrl })
    this.#optionsEl.setButtonsDisabled(false)
  }

  #setupEventListeners() {
    this.#optionsEl.addEventListener('answer', (e) => this.#handleAnswer(e.detail.period))
    this.#scoreEl.addEventListener('restart', () => this.#restart())
  }

  #mapFact(item) {
    return {
      text: item?.fact ?? '',
      imageUrl: item?.imageUrl ?? '',
      period: item?.period ?? ''
    }
  }

  #showQuestion() {
    this.#hideAll()
    this.#viewQuestion.hidden = false
  }

  #handleAnswer(chosenPeriod) {
    if (!this.#current) return
    if (this.#isCorrectAnswer(chosenPeriod)) {
      this.#score++
    }

    this.#round++

    if (this.#isQuizComplete()) {
      this.#finish()
    } else {
      this.#next()
    }
  }

  #isCorrectAnswer(chosenPeriod) {
    return chosenPeriod === this.#current.period
  }

  #isQuizComplete() {
    return this.#round >= this.constructor.ROUNDS
  }

  #finish() {
    this.#hideAll()
    this.#scoreEl.setResult({ score: this.#score, total: this.constructor.ROUNDS })
    this.#viewScore.hidden = false
  }

  #restart() {
    this.#start()
  }

  #showError(msg) {
    this.#hideAll()
    this.#errorEl.textContent = msg ?? 'Error'
    this.#errorEl.hidden = false
  }
}
)
