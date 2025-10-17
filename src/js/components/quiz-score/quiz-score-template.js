const quizScore = document.createElement('template')
quizScore.innerHTML = `
  <style>
    .hidden {
      display: none;
    }

    #quiz-score-container {
      text-align: center;
      background: #ffffff;
      padding: 50px 40px;
      border-radius: 2px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      max-width: 420px;
      margin: 0 auto;
      border: 3px double #d4c4a8;
    }

    h2 {
      font-family: 'Georgia', serif;
      font-size: 28px;
      font-weight: 400;
      color: #2c2416;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }

    #quiz-score {
      font-size: 20px;
      color: #6b6254;
      margin-bottom: 30px;
      font-family: 'Georgia', serif;
    }

    button {
      padding: 14px 40px;
      cursor: pointer;
      border: 2px solid #8b7355;
      background-color: #8b7355;
      color: white;
      border-radius: 2px;
      font-size: 16px;
      font-family: 'Georgia', serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    button:hover {
      background-color: #6d5a42;
      border-color: #6d5a42;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    button:active {
      transform: translateY(0);
    }
  </style>

  <div id="quiz-score-container">
    <h2>Quiz Result</h2>
    <p id="quiz-score" aria-live="polite"></p>
    <button id="restart-quiz" type="button">Restart Quiz</button>
  </div>
`
export { quizScore }