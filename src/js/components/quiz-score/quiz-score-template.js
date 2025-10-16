const quizScore = document.createElement('template')
quizScore.innerHTML = `
<style>
.hidden {
  display: none;
}

#quiz-score-container {
  text-align: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  heigh: 400px;
  margin: 0 auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

li span {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

li span.score {
  flex: 0 0 auto;
  text-align: right;
  margin-left: 10px;
  width: 50px;
}

button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  display: block;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
}

button:hover {
  background-color: #0056b3;
}
</style>
<div id="quiz-score-container">
  <h2>Quiz result</h2>
  <p id="quiz-score" aria-live="polite"></p>
  <button id="restart-quiz" type="button">Restart quiz</button>

</div>
`
export { quizScore }
