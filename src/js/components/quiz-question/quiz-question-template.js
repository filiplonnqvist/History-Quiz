const quizQuestion = document.createElement('template')
quizQuestion.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .container {
      max-width: 720px;
      margin: 0 auto;
      background: #ffffff;
      padding: 20px;          /* ← Minskad från 40px */
      border-radius: 2px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #d4c4a8;
    }

    #question-text {
      font-family: 'Georgia', serif;
      font-size: 20px;        /* ← Minskad från 22px */
      font-weight: 400;
      color: #2c2416;
      text-align: center;
      margin-bottom: 20px;    /* ← Minskad från 30px */
      line-height: 1.6;
    }

    #question-image {
      width: 100%;
      height: auto;
      max-height: 320px;      /* ← VIKTIGT: Minskad från 480px */
      object-fit: contain;
      border: 8px solid #ffffff;
      box-shadow: 
        0 0 0 1px #d4c4a8,
        0 4px 12px rgba(0, 0, 0, 0.12);
      margin-bottom: 20px;    /* ← Minskad från 30px */
      background: #fafaf8;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  </style>

  <div class="container">
    <h2 id="question-text"></h2>
    <img id="question-image" hidden loading="lazy" decoding="async" />
    <form></form>
  </div>
`
export { quizQuestion }