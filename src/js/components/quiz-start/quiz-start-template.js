const quizStart = document.createElement('template')
quizStart.innerHTML = `
  <style>
    #quiz-start-container {
      text-align: center;
      background: #ffffff;
      padding: 40px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 16px;
      color: #333;
    }

    p {
      margin-bottom: 24px;
      line-height: 1.6;
      color: #666;
      font-size: 16px;
    }

    button {
      padding: 12px 32px;
      cursor: pointer;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 8px;
      font-size: 18px;
    }

    button:hover {
      background-color: #0056b3;
    }
  </style>

  <div id="quiz-start-container">
    <h1>Welcome to the History Quiz!</h1>
    <p>Test your knowledge of historical events and figures. Match each fact to its correct historical period.</p>
    <button id="start-quiz" type="button">Start Quiz</button>
  </div>
`
export { quizStart }