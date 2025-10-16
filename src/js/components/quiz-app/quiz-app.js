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

  async connectedCallback() {
    this.#start()
    this.#setupEventListeners()
  }

  #setupEventListeners() {
    this.#optionsEl.addEventListener('answer', (e) => this.#handleAnswer(e.detail.period))
    this.#scoreEl.addEventListener('restart', () => this.#restart())
  }

  async #start() {
    this.#hideAll()
    this.#errorEl.textContent = ''
    this.#round = 0
    this.#score = 0

    try {
      this.#periods = await this.#findAllPeriods()
      this.#optionsEl.setOptions(this.#periods)

      await this.#next()
      this.#showQuestion()
    } catch (err) {
      this.#showError('Could not start quiz. Please try again.')
      console.error(err)
    }
  }

  #hideAll() {
    this.#viewQuestion.hidden = true
    this.#viewScore.hidden = true
    this.#errorEl.hidden = true
  }

  async #findAllPeriods() {
    const allFacts = await this.#facts.getAllFacts()
    const periods = new Set()

    for (const fact of allFacts) {
      if (fact.period) {
        periods.add(fact.period)
      }
    }

    if (periods.size === 0) {
      throw new Error('No periods available.')
    }

    return Array.from(periods)
  }

  async #next() {
    this.#optionsEl.setButtonsDisabled(true)

    let item
    do {
      item = await this.#facts.getRandomFact()
    } while (!item || !item.period)

    const mapped = this.#mapFact(item)
    this.#current = mapped

    this.#questionEl.setFact({ fact: mapped.text, imageUrl: mapped.imageUrl })
    this.#optionsEl.setButtonsDisabled(false)
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

  #mapFact(item) {
    return {
      text: item?.fact ?? '',
      imageUrl: item?.imageUrl ?? '',
      period: item?.period ?? ''
    }
  }

  #showError(msg) {
    this.#hideAll()
    this.#errorEl.textContent = msg ?? 'Error'
    this.#errorEl.hidden = false
  }
}
)
