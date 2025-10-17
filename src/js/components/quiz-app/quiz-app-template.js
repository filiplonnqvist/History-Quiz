const quizApp = document.createElement('template')
quizApp.innerHTML = `
  <style>
    :host { 
      display: block;
      font-family: 'Georgia', 'Times New Roman', serif;
      background: #f5f1e8;
      min-height: 100vh;
    }

    [hidden] { display: none !important; }

    .view {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }

    #view-start {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    #view-question {
      display: grid;
      gap: 24px;
      padding-block: 20px;
    }

    #view-score {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    #error {
      color: #8a1136;
      background: #ffe8ee;
      border: 2px solid #ffc4d2;
      padding: 16px 20px;
      border-radius: 2px;
      margin-top: 20px;
      font-family: 'Georgia', serif;
      text-align: center;
    }
  </style>

  <div id="error" class="view" hidden></div>

  <section id="view-start" class="view">
    <quiz-start></quiz-start>
  </section>

  <section id="view-question" class="view" hidden>
    <quiz-question></quiz-question>
    <quiz-options></quiz-options>
  </section>

  <section id="view-score" class="view" hidden>
    <quiz-score></quiz-score>
  </section>
`
export { quizApp }