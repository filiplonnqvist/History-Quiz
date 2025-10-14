import { RandomHistoricalFacts } from 'random-historical-facts'

/**
 * Generates quiz questions from historical facts.
 */
export class QuestionGenerator {
  #historicalFacts
  #allPeriods = ['prehistoric', 'ancient', 'medieval', 'renaissance', 'early modern', 'enlightenment']

  constructor () {
    this.#historicalFacts = new RandomHistoricalFacts()
  }

  generateQuestion () {
    const fact = this.#historicalFacts.getRandomFact()
  }
}