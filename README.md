# History Quiz

A simple web-based quiz application that tests your knowledge of historical time periods. Match historical facts with their correct era while learning something new!

![Application screenshot](../History-Quiz/images/screenshot.png)

**[Try it live](your-netlify-url-here)**

## What It Does

History Quiz presents you with random historical facts accompanied by images. Your task is to identify which time period each fact belongs to. After 10 questions, see how well you know your history!

## For Users

1. Click "Start Quiz" to begin
2. Read the historical fact and view the image
3. Select the time period you think is correct
4. Complete all 10 questions
5. View your final score and try again!

See [Project Vision](https://github.com/filiplonnqvist/History-Quiz/wiki/Project-Vision) for uses cases and requirements.

## For Developers

### Installation
```bash
# Clone the repository
git clone [your-repo-url]

# Navigate to project
cd history-quiz

# Install dependencies
npm install

# Run tests
npm test
```

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

### Technologies

- **JavaScript** - ES6+ with Web Components
- **Web Components** - Custom elements with Shadow DOM
- **Jest** - Unit testing
- **NPM Module** - [random-historical-facts](https://github.com/filiplonnqvist/Random-Historical-Facts)

### Running the Application

Simply open `index.html` in a modern browser, or deploy to any static hosting service (Netlify, Vercel, GitHub Pages).

### Testing
```bash
npm test
```

See [Test Report](https://github.com/filiplonnqvist/History-Quiz/wiki/Test-Report) for detailed test coverage.

## Module Dependency

This application demonstrates the [random-historical-facts](link-to-module-repo) NPM module, which provides curated historical content with images.

## License

MIT

## Author

Filip Lönnqvist  
Linnaeus University - Software Quality (1DV610)