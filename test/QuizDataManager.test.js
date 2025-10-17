import QuizDataManager from '../src/js/services/QuizDataManager.js'

/** 
 * Unit tests for the QuizDataManager service.
 * These tests verify the functionality of loading periods and selecting random facts.
 */
test('Constructor should create an instance of QuizDataManager', () => {
    const testInstance = new QuizDataManager()
    const isCorrectType = testInstance instanceof QuizDataManager

    expect(isCorrectType).toBe(true)
})

describe('loadAllPeriods()', () => {

    test('should have periods and facts as properties', async () => {
        const dataManager = new QuizDataManager()
        const result = await dataManager.loadAllPeriods(5)

        expect(result).toHaveProperty('periods')
        expect(result).toHaveProperty('facts')
    })

    test('should return arrays of periods and facts', async () => {
        const dataManager = new QuizDataManager()
        const result = await dataManager.loadAllPeriods()

        expect(Array.isArray(result.periods)).toBe(true)
        expect(Array.isArray(result.facts)).toBe(true)
    })

    test('should return the correct amount of facts', async () => {
        const dataManager = new QuizDataManager()
        const result = await dataManager.loadAllPeriods(5)

        expect(result.facts.length === 5).toBe(true)
    })

    test('should return facts with periods', async () => {
        const dataManager = new QuizDataManager()
        const result = await dataManager.loadAllPeriods(10)

        for (const fact of result.facts) {
            expect(fact).toHaveProperty('period')
        }
    })

    test('should return unique periods', async () => {
        const dataManager = new QuizDataManager()
        const result = await dataManager.loadAllPeriods(10)
        const periods = new Set()

        for (const period of result.periods) {
            periods.add(period)
        }

        expect(periods.size === result.periods.length).toBe(true)
    })
})