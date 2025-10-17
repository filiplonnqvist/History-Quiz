const quizOptions = document.createElement('template')
quizOptions.innerHTML = `
  <style>
    #options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 12px;
      margin: 20px 0;
    }

    button {
      padding: 16px 12px;
      border: 2px solid #d4c4a8;
      border-radius: 2px;
      background: #ffffff;
      cursor: pointer;
      font-family: 'Georgia', serif;
      font-size: 15px;
      color: #2c2416;
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    button:hover:not(:disabled) { 
      background: #f5f1e8;
      border-color: #8b7355;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    button:disabled { 
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:active:not(:disabled) {
      transform: translateY(0);
    }
  </style>

  <div id="options" role="group" aria-label="Choose period"></div>
`
export { quizOptions }