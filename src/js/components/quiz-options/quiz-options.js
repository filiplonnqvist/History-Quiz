import { quizOptions } from './quiz-options-template.js'

customElements.define('quiz-options',
    class extends HTMLElement {
        #options
        #disabled = true

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(quizOptions.content.cloneNode(true))

            this.#options = this.shadowRoot.querySelector('#options')

            this.#options.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-period]')
                if (!button || this.#disabled) return
                this.dispatchEvent(new CustomEvent('answer', {
                    detail: { period: button.dataset.period },
                    bubbles: true,
                    composed: true
                }))
            })
        }

        /**
         * Sets the periods to be displayed as buttons in the component.
         * @param {string[]} periods - Array of period strings.
         * @throws {Error} If periods is not a valid non-empty array.
         */
        setOptions(periods) {
            this.#validatePeriods(periods)
            this.#options.innerHTML = ''
            this.#createPeriodButtons(periods)
        }

        #validatePeriods(periods) {
            if (!Array.isArray(periods) || periods.length === 0) {
                throw new Error('No periods available')
            }
        }

        #createPeriodButtons(periods) {
            for (const period of periods) {
                const button = document.createElement('button')
                button.type = 'button'
                button.dataset.period = period
                button.textContent = period
                button.disabled = this.#disabled
                this.#options.appendChild(button)
            }
        }

        /**
         * Enables or disables all option buttons.
         * @param {boolean} disabled - True disables all buttons; false enables them.
         * @returns {void}
         */
        setButtonsDisabled(disabled) {
            this.#setDisabledState(disabled)
            this.#updateButtonStates()
        }

        #setDisabledState(disabled) {
            if (disabled) {
                this.#disabled = true
            } else {
                this.#disabled = false
            }
        }

        #updateButtonStates() {
            const buttons = this.#options.querySelectorAll('button')
            if (buttons.length === 0) return
            buttons.forEach(button => {
                button.disabled = this.#disabled
            })
        }
    })
