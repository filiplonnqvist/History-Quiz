import { RandomHistoricalFacts } from 'random-historical-facts'

export default class QuizDataManager {
    #facts

    constructor() {
        this.#facts = new RandomHistoricalFacts()
    }

    /**
     * Loads all periods and selects a specified number of random facts.
     * @param {number} numberOfFacts - The number of random facts to select.
     * @returns {Promise<{periods: string[], facts: object[]}>} An object containing the list of periods and selected facts.
     * @throws {Error} If no periods are available.
     */
    async loadAllPeriods(numberOfFacts) {
        const allFacts = await this.#facts.getAllFacts()
        return {
            periods: this.#extractPeriods(allFacts),
            facts: this.#selectRandomFacts(allFacts, numberOfFacts)
        }
    }

    #extractPeriods(allFacts) {
        const periods = new Set()
        for (const fact of allFacts) {
            if (fact.period) {
                periods.add(fact.period)
            }
        }
        if (periods.size === 0) throw new Error('No periods available.')
        console.log(periods)

        return Array.from(periods)
    }

    #selectRandomFacts(allFacts, count) {
        const factsWithPeriod = allFacts.filter(f => f.period)
        this.#shuffleArray(factsWithPeriod)
        return factsWithPeriod.slice(0, count)
    }

    #shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
}