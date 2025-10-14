import { RandomHistoricalFacts } from 'random-historical-facts'
import { quizApp } from './quiz-app-template.js'

customElements.define('quiz-app',
  /**
   * Extends the HTML element.
   */
  class extends HTMLElement {
    #welcomeText
    #quizQuestion
    #questionGenerator
    #currentQuestion


    /**
     * Creates a new instance of the QuizApp component.
     * Initializes the shadow DOM and appends the quiz application template content.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(quizApp.content.cloneNode(true))

      this.#welcomeText = this.shadowRoot.querySelector('welcome-text')
      this.#quizQuestion = this.shadowRoot.querySelector('quiz-question')
      }

    /**
     * Invoked when the element is added to the DOM.
     * Attaches event listeners for user interactions and quiz events.
     */
    connectedCallback () {
      this.#quizQuestion.addEventListener('answer-submitted', (event) => {
        const { answer } = event.detail
        this.submitAnswer(answer, this.#nextQuestion)
      })
    }

    fetchQuestion () {
      const facts = this.#questionGenerator
      const randomFact = facts.getRandomFact()
    }

    fetchQuestionImage () {

  }
}
)
