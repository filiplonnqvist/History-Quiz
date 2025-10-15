const quizOptions = document.createElement('template')
quizOptions.innerHTML = `
  <style>
    #options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 8px;
      margin: 12px 0;
    }
    button {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fff;
      cursor: pointer;
      font: inherit;
    }
    button:hover { background: #f5f5f5; }
    button:disabled { opacity: .6; cursor: not-allowed; }
  </style>

  <div id="options" role="group" aria-label="Choose period"></div>
`
export { quizOptions }
