import { quizScore } from './quiz-score-template.js'

/**
 * Custom element for managing and displaying quiz score.
 * Handles storing, rendering, and updating the quiz score.
 */
customElements.define('quiz-score',
  /**
   * Class representing the QuizScore custom element.
   * Extends the HTMLElement class.
   */
  class extends HTMLElement {
    #quizScore
    #restartButton

    /**
     * Creates a new instance of the QuizScore component.
     * Initializes the shadow DOM, appends the template content, and sets up event listeners.
     */
    constructor () {
      super()
      this.attachShadow.appendChild(quizScore.content.cloneNode(true))

      this.#quizScore = this.shadowRoot.querySelector('#quiz-score-list')
      this.#restartButton = this.shadowRoot.querySelector('#restart-quiz')

      this.#restartButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('restart'))
      })
    }

    /**
     * Displays the results based on the game outcome.
     * If the player wins, their score is stored in local storage.
     *
     * @param {object} [playerData={}] - The player's data (optional).
     * @param {number} playerData.score - The player's score in seconds.
     */
    showScore (playerData = {}) {
      this.#storeScore(playerData.score)
      this.update()
    }

    /**
     * Stores the player's score in local storage and updates the high score list.
     *
     * @param {number} score - The player's score in seconds.
     * @private
     */
    #storeScore (score) {
      const scores = this.#getScore()
      score.push({ score })
      localStorage.setItem('quizScore', JSON.stringify(scores))
      this.#renderScore(score)
    }

    /**
     * Retrieves the high scores from local storage.
     *
     * @returns {Array<object>} An array of high score entries.
     * Each entry is an object with a `nickname` and a `score` property.
     * @private
     */
    #getScores () {
      const storedScore = localStorage.getItem('quizScore')

      if (storedScore) {
        try {
          return JSON.parse(storedScore)
        } catch (error) {
          console.log('Error when parsing quizScore from localStorage', error)
          return []
        }
      }
      return [] // If there are no scores, return an empty array
    }

    /**
     * Renders the high scores in the high score list element.
     *
     * @param {Array<object>} scores - The array of high score entries to display.
     * @private
     */
    #renderScore (scores) {
      this.#quizScore.innerHTML = ''

      scores.forEach(entry => {
        const listItem = document.createElement('li')
        listItem.textContent = `${this.entry.score}`
        this.#quizScore.appendChild(listItem)
      })
    }

    /**
     * Updates the high score list by retrieving and rendering scores.
     * This method is public and can be called to refresh the displayed scores.
     */
    update () {
      this.#renderScore(this.#getScores())
    }
  }

)
