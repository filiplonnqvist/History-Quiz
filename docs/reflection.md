# Reflektion

## Kapitel 2 - Meaningful Names
Det andra kapitlet har gett mig insikt kring betydelsen av namngivning, då det också hänger mycket ihop med hur man strukturerar koden. Om man exempelvis arbetar med beskrivande titlar så minskar behovet av onödiga kommentarer. När koden i en funktion bryts ut till privata metoder så ökar behovet av bra namngivning, och det i sin tur resulterar i färre rader kod i funktionerna.

De privata metoderna `#validateScore` och `#validateFact` är ett exempel på "intention revealing names" som är tydliga och konsekventa. De publika metoderna `setResult` och `setFact` kommunicerar också tydligt med användaren via beskrivande verb. Jag har också tänkt på variabelnamn som `score` och `total` istället för generiska namn som `s` eller `t`.

- Exempel:

```javascript
    #validateFact (fact) {
      if (!fact || typeof fact !== 'object') {
        throw new Error('Question could not be loaded')
      }
    }
```

## Kapitel 3 - Functions

Jag har försökt att följa "Do One Thing"-principen genom att försöka bryta ut kod i mindre, ofta privata metoder som anropas av den publika metoden. Ett bra exempel är hur `setResult()` delegerar till `#validateScore()` och `#renderResult()`. Detta gör koden lättare att testa och förstå. Funktionerna blir också "Small", det vill säga får väldigt få rader kod. Under förra laboration var jag skeptisk till arbetssättet, men nu har jag börjat förstå tankesättet och inse fördelarna. Även om koden kan bli längre, så är privata beskrivande metoder som brytits ut väldigt lättförståeliga för utomstående utvecklare. På så vis följer jag också "One Level of Abstraction per Function"-principen där publika metoder hanterar det övergripande flödet medan privata metoder hanterar specifika detaljer.

- Exempel:

```javascript
setResult ({ score, total }) {
    this.#validateScore(score, total)
    this.#renderResult(score, total)
}
```

```javascript
#validateScore (score, total) {
    if (!Number.isFinite(score) || !Number.isFinite(total)) {
        throw new Error('Invalid numbers')
    }
}
```
```javascript
#renderResult (score, total) {
    this.shadowRoot.querySelector('#quiz-score').textContent =
     `Your score: ${score} / ${total}`
}
```

## Kapitel 4 - Comments

Jag har konsekvent försökt följa principen "Explain Yourself in Code" genom att skriva kod med självförklarande namn istället för att förlita mig på kommentarer. Privata metoder saknas därför ofta kommentarer, eftersom dess funktion istället beskrivs i dokumentationen av den publika metoden där den anropas. Om jag hade lagt till ytterligare information på exempelvis `#validateScore` och `#renderResult` så hade det blivit "Redundant Comments", eftersom koden är (och bör) vara skriven på ett där abstraktion och namngivning redan gör det tydligt vad som ska göras. Jag undviker också "Noise Comments" genom att inte kommentera självklara saker som `constructor()` eller enkla event handlers.

- Exempel:

```javascript

/**
 * Sets the fact to be displayed in the component.
 * @param {{fact:string,imageUrl?:string}} fact - The fact object containing text and optional image URL.
 * @throws {Error} If the fact is not a valid object.
 */
setFact(fact) {
    this.#validateFact(fact)
    ...
}
```

## Kapitel 5 - Formatting

Jag har följt principerna för korrekt formatering med fokus på "Vertical Formatting", "Vertical Openness" och "Vertical Distance". Publika metoder placeras medvetet först, följda av de privata metoder som anropas - en struktur som följer "Newspaper Metaphor" där det viktigaste kommer först. Konsekvent användning av tomrader mellan metoder skapar visuell tydlighet, medan relaterade privata metoder ligger nära varandra för att minska "Vertical Distance". Jag har även följt "Horizontal Formatting" genom att hålla raderna korta och läsbara.

En utmaning uppstod i `quiz-app.js` där `connectedCallback()` anropar två privata metoder. Enligt "Dependent Functions" borde `#showStart()` och `#setupEventListeners()` ligga direkt efter, men jag valde att placera `#setupEventListeners()` först av strukturella skäl - den konfigurerar komponentens beteende medan `#showStart()` hör till det övergripande flödet tillsammans med `#start()`, `#finish()` och `#restart()`. Detta är ett exempel på hur formatteringsprinciper ibland står i konflikt med varandra, och man måste göra ett medvetet val baserat på vad som ger bäst läsbarhet för den specifika kontexten.

- Exempel:
```javascript
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
```

## Kapitel 6 - Objects and Data Structures

Mina Web Components följer "Data/Object Anti-Symmetry" genom att dölja data (privata fält som #options, #disabled) och exponera beteende genom publika metoder. Detta implementeras exempelvis i `quiz-options` där tillståndet är privat men manipuleras via `setOptions()` och `setButtonsDisabled()`. "Law of Demeter" följs genom att komponenter inte exponerar sin interna struktur. Andra komponenter kan inte direkt komma åt DOM-element. Jag är relativt van vid att arbeta med komponenter då detta var någonting jag gjorde även i förra terminens projektkurs, så jag känner mig relativt bekväm med att tänka i komponentstruktur och hur man ska strukturera upp hierarkin. Det var dock intressant att läsa om, och det fick mig att vara ännu mer noggrann med att endast exponera publika metoder och gömma intern logik i privata metoder.

```javascript
setButtonsDisabled(disabled) {
    this.#setDisabledState(disabled)
    this.#updateButtonStates()
}
```

```javascript
setOptions(periods) {
    this.#validatePeriods(periods)
    this.#options.innerHTML = ''
    this.#createPeriodButtons(periods)
}
```
## Kapitel 7 - Error Handling

Det har absolut varit intressant att läsa om felhantering eftersom det är någonting man har implementerat baserat på gammal kunskap snarare än att reflektera kring vad som faktiskt behövs. Principer som "Provide Context with Exceptions" är relativt lätta att greppa, och det är också någonting jag har tänkt på sedan gammalt:
```javascript
throw new Error('Question could not be loaded')
throw new Error('No periods available')
throw new Error('Invalid numbers')
```

Jag validerar också och kastar exceptions istället för att returnera null ("Don't Return Null"):
```javascript
#validateFact(fact) {
    if (!fact || typeof fact !== 'object') {
        throw new Error('Question could not be loaded')
    }
}
```

Detta är också ett exempel på "Define the Normal Flow". I detta fall har jag skapat en eventlyssnare för att se till att appen inte kraschar om bilden saknas. Jag tyckte det var ett enkelt och tydligt sätt att hantera en situation utan att fylla `setFact()` med omfattande try-catch-block som skulle minska läsbarheten. På så vis fick kapitlet mig att tänka på hur felhantering faktiskt inte bara är ett enkelt felmeddelande i slutet av ett kodblock, utan någonting som faktiskt bör ägnas tanke.
```javascript
this.#image.addEventListener('error', () => {
    this.#image.hidden = true
    this.#image.removeAttribute('src')
    this.dispatchEvent(new CustomEvent('image-error', { bubbles: true, composed: true }))
})
```

## Kapitel 8 - Clean Boundaries

Detta kapitlet har varit väldigt relevant ur en teknisk synvinkel då hela applikationen har byggt på att återanvända ett tredjepartsbibliotek. Svårigheten för mig har legat i hur mycket man ska begränsa återanvändandet av NPM-modulen, eftersom den lätt hade kunnat användas på många ställen i koden, och därmed göra den mindre modulär. "Using Third-Party Code" och "Clean Boundaries" berör ämnet på ett bra sätt:
```javascript
import { RandomHistoricalFacts } from 'random-historical-facts'

export default class QuizDataManager {
    #facts

    constructor() {
        this.#facts = new RandomHistoricalFacts()
    }

    async loadAllPeriods(numberOfFacts) {
        const allFacts = await this.#facts.getAllFacts()
        return {
            periods: this.#extractPeriods(allFacts),
            facts: this.#selectRandomFacts(allFacts, numberOfFacts)
        }
    }
}
```

Här är ett exempel på hur jag har gjort för att isolera användningen av NPM-modulen så gott det går. Det externa biblioteket importeras alltså endast på ett ställe, och resten av `quiz-app` känner inte till och BEHÖVER inte känna till modulens existens. Genom att ha god uppdelning av koden (SOC) så kan detta alltså påverka även hur väl man hanterar användningen av externa bibliotek, vilket är något jag tar med mig från boken.

## Kapitel 9 - Unit Tests

Efter att ha läst kapitlet insåg jag att mina tester hade onödig upprepning där jag instansierade `QuizDataManager` i varje enskilt test. I boken står det att "readability is more important in tests than avoiding duplication". Jag valde dock ändå att använda mig av `beforeEach`, då jag anser att tydligheten definitivt kvarstår trots förenklingen. Det följer också principen om "Clean Tests", eftersom testerna är väldigt specifika och beskrivande i vad de gör och lämnar få frågetecken.

```javascript
describe('loadAllPeriods()', () => {
    let dataManager
    beforeEach(() => {
        dataManager = new QuizDataManager()
    })

    test('should have periods and facts as properties', async () => {
        const result = await dataManager.loadAllPeriods(5)

        expect(result).toHaveProperty('periods')
        expect(result).toHaveProperty('facts')
    })
    ...
})
```

En princip jag brutit mot är "One Assert per Test", men jag valde att låta det vara kvar då den testar två väldigt liknande egenskapers existens som är grundläggande i huruvida appen fungerar som den ska.
```javascript
test('should return arrays of periods and facts', async () => {
    const result = await dataManager.loadAllPeriods()

    expect(Array.isArray(result.periods)).toBe(true)
    expect(Array.isArray(result.facts)).toBe(true)
})
```

Jag valde manuella tester för appens UI eftersom automatiska UI-tester av Web Components hade krävt mocking av Shadow DOM. Med den tid som fanns tillgänglig ansåg jag att manuella tester var mer effektiva för att verifiera att själva användarflödet fungerar som det ska, medan automatiska tester fokuserar på affärslogiken i `QuizDataManager`.

## Kapitel 10 - Classes

Detta kapitlet har varit väldigt relevant för min kod, inte minst då komponentstrukturen har en väldigt tydlig uppdelning men också kräver att man isolerar kommunikationen på ett bra sätt mellan komponenterna. Boken hävdar att "Classes Should Be Small!", vilket är en princip som jag följt **delvis**. Eftersom principen handlar om ansvar, snarare än mängden kod, så har nästan alla klasser följt principen. Ett tydligt exempel är `quiz-score` som endast har ca 40 rader kod och är väldigt tydlig med vad den gör:
```javascript
// quiz-score.js - ~40 rader
class QuizScore {
  #quizScore
  #restartButton
  
  setResult({ score, total }) {
    this.#validateScore(score, total)
    this.#renderResult(score, total)
  }
}
```

Klassen `quiz-app` bryter dock mot denna principen eftersom det är en klass som orkestrerar hela flödet och därmed hanterar många olika saker. Jag hade dock svårt att se hur jag skulle lösa det annorlunda. Hela klassen har ungefärligt 200 rader kod, vilket i alla fall är rimligt ur en storlekssynvinkel.

Ett positivt exempel från min kod är den höga cohesion i `QuizDataManager` eftersom alla privata metoder använder `#facts` vilket förenklar och gör klassen väldigt läsbar:
```javascript
class QuizDataManager {
    #facts

    constructor() {
        this.#facts = new RandomHistoricalFacts()
    }

    async loadAllPeriods(numberOfFacts) {
        const allFacts = await this.#facts.getAllFacts()
        ...
    }
}
```

## Kapitel 11 - Systems

Detta kapitel handlar mer övergripande om systemstruktur på en högre nivå och berör min kod på olika sätt. Enligt principen "Separate Constructing a System from using It" så ska man utgå från *separation of concern* och designa ett system som är tydligt som möjligt i *vem* som gör *vad*. Vid alla nivåer av abstraktion, så måste syftet med systemet vara tydligt. I mitt fall finns det en tydlig separation där varje webbkomponent ansvarar för respektive område på UI-nivå, därefter orkestrerar `quiz-app` som anropar `QuizDataManager` i servicelagret som i sin tur anropar det externa beroendet `random-historical-facts`. 

Denna strukturen gör också att "Scaling Up" blir enklare. Man hade utan problem exempelvis kunnat lägga till ytterligare klasser som `quiz-timer` eller `quiz-high-score` utan att förändra beroenden. På samma sätt följer detta "Optimize Decision Making" eftersom strukturen tillåter ändringar i ett sent skede utan att behöva ändra UI. Nya komponenter kan läggas till utan refactoring.

En utmaning var att avgöra var gränsen går mellan `quiz-app` som orchestrator och `QuizDataManager` som service - till slut valde jag att låta all quiz-logik ligga i `quiz-app` medan `QuizDataManager` endast hanterar data-transformering.

# Refaktorering av `Random Historical Facts`

Under refaktoreringen av modulen har jag huvudsakligen arbetat med att eliminera "Flag Arguments" i min kod, vilket varit ett återkommande problem. Detta har resulterat i fler privata metoder där varje metod har ett tydligare syfte.

`#findRandomFact()` och `#sortFactsBeforeYear()` har båda brutits ut i två separata metoder. På så sätt elimineras behovet av boolean-parametrar och if-else logik som avgör beteende.

`getAllFactsSortedAscendingByYear()` och `getAllFactsSortedDescendingByYear()` har fått sina implementationer direkt i respektive metod, istället för att delegera till en gemensam privat metod med flag argument. Detta gör metoderna mer läsbara trots att det innebär minimal kodduplicering.

Namnet `#sortFactsBeforeYear()` har också ändrats till `#filterFactsBeforeYear()` eftersom metoden filtrerar snarare än sorterar.

En brist som identifierades under utvecklingen av en quiz-app som använder modulen är avsaknaden av en publik metod `getAllPeriods()`. För att få ut tillgängliga perioder behövde jag istället använda `getAllFacts()` och manuellt loopa igenom objekten för att extrahera perioder, vilket hade kunnat undvikas med en dedikerad metod.