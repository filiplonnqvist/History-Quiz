import { quizScore } from './quiz-score-template.js'

/**
 * Custom element for managing and displaying quiz score.
 */
customElements.define('quiz-score',
  /**
   * Class representing the QuizScore custom element.
   */
  class extends HTMLElement {
    #quizScore
    #restartButton

    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(quizScore.content.cloneNode(true))

      this.#quizScore = this.shadowRoot.querySelector('#quiz-score')
      this.#restartButton = this.shadowRoot.querySelector('#restart-quiz')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      this.#setupEventListeners()
    }

    #setupEventListeners () {
      this.#restartButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('restart', { bubbles: true, composed: true }))
      })
    }

    /**
     * Sets the result of the quiz.
     *
     * @param {{score:number,total:number}} param0
     * @throws {Error} If the score or total is not a valid number.
     */
    setResult ({ score, total }) {
      this.#validateScore(score, total)
      this.#renderResult(score, total)
    }

    #validateScore (score, total) {
      if (!Number.isFinite(score) || !Number.isFinite(total)) {
        throw new Error('Invalid numbers')
      }
    }

    #renderResult (score, total) {
      this.shadowRoot.querySelector('#quiz-score').textContent = `Your score: ${score} / ${total}`
    }
  }

)
