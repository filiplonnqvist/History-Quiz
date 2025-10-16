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

    #view-question {
      display: grid;
      gap: 16px;
      padding-block: 24px;
    }

    #view-score {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

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
    <h2>Welcome to the History Quiz!</h2>
    <p>Test your knowledge of historical events and figures. Please press the matching period button.</p>
        <button type="submit">Start quiz</button>
    <quiz-question></quiz-question>
    <quiz-options></quiz-options>
  </section>

  <section id="view-score" class="view" hidden>
    <quiz-score></quiz-score>
  </section>
`
export { quizApp }
