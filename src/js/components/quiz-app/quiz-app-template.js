// quiz-app-template.js
const quizApp = document.createElement('template')
quizApp.innerHTML = `
  <style>
    [hidden] { display: none !important; }
    .view { max-width: 700px; margin: 0 auto; }
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
