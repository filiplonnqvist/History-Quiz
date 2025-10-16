# Reflection

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

Jag har konsekvent försökt följa principen "Explain Yourself in Code" genom att skriva kod med självförklarande namn istället för att förlita mig på kommentarer. Privata metoder saknas därför ofta kommentarer, efter dess funktion istället beskrivs i dokumentationen av den publika metoden där den anropas. Om jag hade lagt till ytterligare information på exempelvis `#validateScore` och `#renderResult` så hade det blivit "Redundant Comments", eftersom koden är (och bör) vara skriven på ett där abstraktion och namngivning redan gör det tydligt vad som ska göras. Jag undviker också "Noise Comments" genom att inte kommentera självklara saker som `constructor()` eller enkla event handlers.

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
## Kapitel 6 - Objects and Data Structures

Mina Web Components följer "Data/Object Anti-Symmetry" genom att dölja data (privata fält som #options, #disabled) och exponera beteende genom publika metoder. Detta exemplifieras i `quiz-options` där tillståndet är privat men manipuleras via `setOptions()` och `setButtonsDisabled()`. "Law of Demeter" följs genom att komponenter inte exponerar sin interna struktur - andra komponenter kan inte direkt komma åt DOM-element eller interna tillstånd. Jag använder "Data Transfer Objects" i form av CustomEvents med detail-objekt för att kommunicera mellan komponenter på ett strukturerat sätt.

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



jag fick använda mig av avancerade sätt att få ut perioder och facts eftersom getAllPeriods() inte existerade i NPM paketet. istället fick jag loopa igenom 