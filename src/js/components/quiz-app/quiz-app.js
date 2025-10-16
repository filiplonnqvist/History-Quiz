import QuizDataManager from '../../services/QuizDataManager.js'
import '../quiz-start/index.js'
import '../quiz-question/index.js'
import '../quiz-options/index.js'
import '../quiz-score/index.js'
import { quizApp } from './quiz-app-template.js'

/**
 * Custom element for the main quiz application.
 */
customElements.define('quiz-app',
  class extends HTMLElement {
    #startEl
    #questionEl
    #optionsEl
    #scoreEl
    #viewStart
    #viewQuestion
    #viewScore
    #errorEl

    #round = 0
    #score = 0
    #periods = []
    #currentQuestion = null
    #availableFacts = []

    #dataManager = new QuizDataManager()

    static ROUNDS = 10

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(quizApp.content.cloneNode(true))

      this.#startEl = this.shadowRoot.querySelector('quiz-start')
      this.#questionEl = this.shadowRoot.querySelector('quiz-question')
      this.#optionsEl = this.shadowRoot.querySelector('quiz-options')
      this.#scoreEl = this.shadowRoot.querySelector('quiz-score')
      this.#viewStart = this.shadowRoot.querySelector('#view-start')
      this.#viewQuestion = this.shadowRoot.querySelector('#view-question')
      this.#viewScore = this.shadowRoot.querySelector('#view-score')
      this.#errorEl = this.shadowRoot.querySelector('#error')
    }

    async connectedCallback() {
      this.#showStart()
      this.#setupEventListeners()
    }

    #setupEventListeners() {
      this.#startEl.addEventListener('start', () => this.#start())
      this.#optionsEl.addEventListener('answer', (e) => this.#handleAnswer(e.detail.period))
      this.#scoreEl.addEventListener('restart', () => this.#restart())
    }

    #showStart() {
      this.#hideAll()
      this.#viewStart.hidden = false
    }

    async #start() {
      this.#resetQuizState()

      try {
        await this.#loadQuizData()
        this.#next()
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

    async #loadQuizData() {
      const { periods, facts } = await this.#dataManager.loadAllPeriods(this.constructor.ROUNDS)

      this.#periods = periods
      this.#optionsEl.setOptions(this.#periods)
      this.#availableFacts = facts
    }

    #hideAll() {
      this.#viewStart.hidden = true
      this.#viewQuestion.hidden = true
      this.#viewScore.hidden = true
      this.#errorEl.hidden = true
    }

    #next() {
      this.#optionsEl.setButtonsDisabled(true)

      if (this.#availableFacts.length === 0) {
        throw new Error('No more facts available')
      }

      this.#currentQuestion = this.#availableFacts.pop()

      this.#questionEl.setFact({ fact: this.#currentQuestion.fact, imageUrl: this.#currentQuestion.imageUrl })
      this.#optionsEl.setButtonsDisabled(false)
    }

    #showQuestion() {
      this.#hideAll()
      this.#viewQuestion.hidden = false
    }

    #handleAnswer(chosenPeriod) {
      if (!this.#currentQuestion) return
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
      return chosenPeriod === this.#currentQuestion.period
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
      this.#showStart()
    }

    #showError(msg) {
      this.#hideAll()
      this.#errorEl.textContent = msg || 'Error'
      this.#errorEl.hidden = false
    }
  }
)