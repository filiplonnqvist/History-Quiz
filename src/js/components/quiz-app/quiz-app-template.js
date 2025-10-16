// quiz-app-template.js
const quizApp = document.createElement('template')
quizApp.innerHTML = `
  <style>
    :host { display:block; }

    [hidden] { display:none !important; }

    .view {
      max-width: 700px;
      margin: 0 auto;
      padding: 16px;
    }

    /* Frågevyn: lite luft mellan barnen */
    #view-question {
      display: grid;
      gap: 16px;
      padding-block: 24px;
    }

    /* Score-vyn: mitt på sidan vertikalt + horisontellt */
    #view-score {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    /* Snyggare felruta */
    #error {
      color: #8a1136;
      background: #ffe8ee;
      border: 1px solid #ffc4d2;
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 16px;
    }
  </style>

  <div id="error" class="view" hidden></div>

  <section id="view-question" class="view" hidden>
    <quiz-question></quiz-question>
    <quiz-options></quiz-options>
  </section>

  <section id="view-score" class="view" hidden>
    <quiz-score></quiz-score>
  </section>
`
export { quizApp }
