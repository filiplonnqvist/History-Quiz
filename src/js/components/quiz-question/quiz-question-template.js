const quizQuestion = document.createElement('template')
quizQuestion.innerHTML = `
<style>
  :host {
    display: block;
  }

  /* Kortet */
  .container {
    max-width: 680px;      /* <- styr totalbredden */
    margin: 0 auto;
  }

  #question {
    text-align: center;
    margin-bottom: 20px;
  }

  /* Bilden */
  #question-image {
    width: 100%;
    height: auto;
    max-height: 480px;
    object-fit: contain;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin: 0 auto;
    width: fit-content;
  }

  input[type="text"] {
    width: 300px;
    height: 40px;
    font-size: 16px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  label { font-size: 16px; }

  button {
    align-self: center;
    width: 150px;
    height: 40px;
    font-size: 16px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover { background-color: #0056b3; }
</style>

<div class="container">
  <h2 id="question-text"></h2>
  <img id="question-image" hidden loading="lazy" decoding="async" />
  <form></form>
</div>

`
export { quizQuestion }