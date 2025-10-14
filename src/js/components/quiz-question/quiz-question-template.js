const quizQuestion = document.createElement('template')
quizQuestion.innerHTML = `
<style>
  #question {
    text-align: center;
    margin-bottom: 20px;
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
  label {
    font-size: 16px;
  }
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
  button:hover {
    background-color: #0056b3;
  }
</style>
<div>
  <h2 id="question"></h2>
  <form>
    <button type="submit">Submit</button>
  </form>
</div>
`
export { quizQuestion }