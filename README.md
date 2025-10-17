# History Quiz

A simple web-based quiz application that tests your knowledge of historical time periods. Match historical facts with their correct era while learning something new!

![Application screenshot](https://github.com/filiplonnqvist/History-Quiz/blob/main/images/screenshot.png)

**[Try it live](https://history-quiz.netlify.app)**

---

## What It Does

The app presents random historical facts with accompanying images.
Your task is to identify which time period each fact belongs to.
After 10 questions, see how well you know your history!

---

## For Users

1. Click **Start Quiz** to begin
2. Read the historical fact and view the image
3. Select the time period you think is correct
4. Continue until all 10 questions are answered
5. View your final score and try again

See the [Project Vision](https://github.com/filiplonnqvist/History-Quiz/wiki/Project-Vision) for detailed use cases and requirements.

---

## For Developers

### Installation

```bash
# Clone the repository
git clone https://github.com/filiplonnqvist/History-Quiz.git

# Navigate to project
cd history-quiz

# Install dependencies
npm install

# Run tests
npm test
```

### Build for Production

```bash
# Build
npm run build
```

This command bundles the application using **Vite**.
The build output is located in the `dist/` directory (used as the Netlify publish folder).

---

### Project Structure

```
history-quiz/
├── src/
│   ├── js/
│   │   ├── components/      # Web Components
│   │   └── services/        # Data management
│   ├── css/
│   └── index.html
└── test/                    # Jest unit tests
```

### Architecture

The application is built using a modular **Web Component architecture**. It consists of the following components:

* **`quiz-app`** – Root component controlling view flow (start → question → score)
* **`quiz-question`** – Displays current fact and image
* **`quiz-options`** – Renders answer buttons and dispatches selection events
* **`quiz-score`** – Shows final results and restart button
* **`QuizDataManager`** – Handles data retrieval from the NPM module

---
### Version Control

Development follows a **feature branch** workflow.
Each new feature or fix is developed in its own branch, reviewed, and then merged into main.

---

### Technologies

* **JavaScript** – ES6+ with Web Components
* **Web Components** – Custom elements using the Shadow DOM
* **Jest** – Unit testing
* **NPM Module** – [random-historical-facts](https://github.com/filiplonnqvist/Random-Historical-Facts)

---

### Testing

* **Automated:** Jest unit tests for `QuizDataManager`
* **Manual:** Browser-based tests covering all use cases (see [Test Report](https://github.com/filiplonnqvist/History-Quiz/wiki/Test-Report))

```bash
npm test
```

---

## License

MIT License - © 2025 Filip Lönnqvist

---

## Author

**Filip Lönnqvist**

- GitHub: [@filiplonnqvist](https://github.com/filiplonnqvist)
- University: Linnaeus University
- Course: Software Quality (1DV610)

