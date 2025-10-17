const quizStart = document.createElement('template')
quizStart.innerHTML = `
  <style>
    #quiz-start-container {
      text-align: center;
      background: #ffffff;
      padding: 50px 40px;
      border-radius: 2px;
      box-shadow: 
        0 2px 8px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(0, 0, 0, 0.05);
      max-width: 520px;
      margin: 0 auto;
      border: 3px double #d4c4a8;
    }

    h1 {
      font-family: 'Georgia', serif;
      font-size: 32px;
      font-weight: 400;
      color: #2c2416;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }

    p {
      font-family: 'Georgia', serif;
      margin-bottom: 32px;
      line-height: 1.8;
      color: #6b6254;
      font-size: 17px;
    }

    button {
      padding: 14px 40px;
      cursor: pointer;
      border: 2px solid #8b7355;
      background-color: #8b7355;
      color: #ffffff;
      border-radius: 2px;
      font-size: 16px;
      font-family: 'Georgia', serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-weight: 500;
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

  <div id="quiz-start-container">
    <h1>Welcome to the History Quiz!</h1>
    <p>Test your knowledge of historical events and figures. Match each fact to its correct historical period.</p>
    <button id="start-quiz" type="button">Start Quiz</button>
  </div>
`
export { quizStart }