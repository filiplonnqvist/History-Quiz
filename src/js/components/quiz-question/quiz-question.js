import { quizQuestion } from './quiz-question-template.js'

/**
 * Custom element for displaying a quiz question with text and an optional image.
 */
customElements.define('quiz-question',
  class extends HTMLElement {
    #text
    #image

    constructor() {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(quizQuestion.content.cloneNode(true))

      this.#text = this.shadowRoot.querySelector('#question-text')
      this.#image = this.shadowRoot.querySelector('#question-image')

      this.#image.addEventListener('error', () => {
        this.#image.hidden = true
        this.#image.removeAttribute('src') // Remove the src attribute if image fails to load
        this.dispatchEvent(new CustomEvent('image-error', { bubbles: true, composed: true }))
      })
    }

    /**
     * Sets the fact to be displayed in the component.
     * @param {{fact:string,imageUrl?:string}} fact - The fact object containing text and optional image URL.
     * @throws {Error} If the fact is not a valid object.
     */
    setFact(fact) {
      this.#validateFact(fact)

      // Update the DOM elements with the new fact data
      this.#text.textContent = fact.fact

      if (fact.imageUrl) {
        this.#image.hidden = false
        this.#image.src = fact.imageUrl
      } else {
        this.#image.hidden = true
        this.#image.removeAttribute('src')
      }
    }

    #validateFact(fact) {
      if (!fact || typeof fact !== 'object') {
        throw new Error('Question could not be loaded')
      }
    }
  }
)