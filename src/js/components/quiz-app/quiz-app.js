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
  static PERIOD_DISCOVERY_MAX_TRIES = 100;

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
    await Promise.all([
      customElements.whenDefined('quiz-question'),
      customElements.whenDefined('quiz-options'),
      customElements.whenDefined('quiz-score'),
    ])

    this.#optionsEl.addEventListener('answer', (e) => this.#onAnswer(e.detail.period))
    this.#scoreEl.addEventListener('restart', () => this.#restart())

    this.#start()
  }

  async #start() {
    this.#hideAll()
    this.#errorEl.textContent = ''
    this.#round = 0
    this.#score = 0

    try {
      this.#periods = await this.#discoverPeriods()
      this.#optionsEl.setOptions(this.#periods)

      await this.#next()
      this.#showQuestion()
    } catch (err) {
      this.#showError('Kunde inte starta quizet. Försök igen.')
      console.error(err)
    }
  }

  async #discoverPeriods() {
    const set = new Set()
    let tries = 0
    while (set.size < 3 && tries < this.constructor.PERIOD_DISCOVERY_MAX_TRIES) {
      tries++
      const item = await this.#facts.getRandomFact()   // 🛠 instansen
      if (item && item.period) set.add(item.period)
    }
    if (set.size === 0) throw new Error('No periods')
    return Array.from(set).sort()
  }

  async #next() {
    this.#optionsEl.setButtonsDisabled(true)

    let item
    do {
      item = await this.#facts.getRandomFact()         // 🛠 instansen
    } while (!item || !item.period)

    const mapped = this.#mapFact(item)
    this.#current = mapped

    this.#questionEl.setFact({ fact: mapped.text, imageUrl: mapped.imageUrl })
    this.#optionsEl.setButtonsDisabled(false)
  }

  #onAnswer(chosenPeriod) {
    if (!this.#current) return
    if (chosenPeriod === this.#current.period) this.#score++

    this.#round++
    if (this.#round >= this.constructor.ROUNDS) {
      this.#finish()
    } else {
      // auto-next
      this.#next()
    }
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

  #showQuestion() {
    this.#hideAll()
    this.#viewQuestion.hidden = false
  }

  #showError(msg) {
    this.#hideAll()
    this.#errorEl.textContent = msg ?? 'Error'
    this.#errorEl.hidden = false
  }

  #hideAll() {
    this.#viewQuestion.hidden = true
    this.#viewScore.hidden = true
    this.#errorEl.hidden = true
  }
}
)
