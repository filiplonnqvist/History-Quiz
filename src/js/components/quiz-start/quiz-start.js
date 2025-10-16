import { quizStart } from './quiz-start-template.js'

/**
 * Custom element for the quiz start screen.
 */
customElements.define('quiz-start',
    class extends HTMLElement {
        #startButton

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(quizStart.content.cloneNode(true))

            this.#startButton = this.shadowRoot.querySelector('#start-quiz')
        }

        connectedCallback() {
            this.#setupEventListeners()
        }

        #setupEventListeners() {
            this.#startButton.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('start', { bubbles: true, composed: true }))  // ✅ Ändra till 'start'
            })
        }
    }
)