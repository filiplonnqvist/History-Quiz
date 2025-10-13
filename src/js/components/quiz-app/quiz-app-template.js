const quizApp = document.createElement('template')
quizApp.innerHTML = `
<style>
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
    color: #000000;
    margin: 0;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  welcome-text {
    margin: 0;
    padding: 20px;
  }
  .hidden {
    display: none;
  }
</style>
<welcome-text>Welcome to the history quiz! You will be served questions soon.</welcome-text>
<quiz-question class="hidden"></quiz-question>
`
export { quizApp }
