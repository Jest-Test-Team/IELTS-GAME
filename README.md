# IELTS Writing Error Tester

A Next.js Single Page Application for practicing IELTS writing errors. This interactive tool helps students improve their English writing skills through three types of tests:

## Features

- **Spelling Test**: Practice commonly misspelled words with hints
- **Grammar Errors Test**: Fill in the blanks with correct grammar
- **Overall Errors & Rules Test**: Multiple choice questions about writing rules
- **Session Reports**: Track progress and review mistakes
- **Local Storage**: Persistent statistics across sessions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with custom CSS
- **Deployment**: Vercel (Static Export)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/IELTS-GAME.git
cd IELTS-GAME
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is configured for static export and can be deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

Or manually deploy:
```bash
npm run build
# The 'out' folder contains the static files
```

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useTestController.ts
│   ├── TestContainer.tsx
│   └── ReportModal.tsx
├── data/
│   └── questions.ts
└── types/
    └── index.ts
```

## Features in Detail

### Test Types

1. **Spelling Test**: Tests common spelling mistakes with Chinese hints
2. **Grammar Test**: Focuses on grammatical errors and verb forms
3. **Rules Test**: Tests knowledge of IELTS writing rules and principles

### Progress Tracking

- Session statistics (attempts, correct answers, accuracy rate)
- Persistent total statistics using localStorage
- Error tracking with detailed feedback
- Progress reports every 40 questions

### User Experience

- Responsive design
- Keyboard navigation (Enter to submit)
- Visual feedback for correct/incorrect answers
- Modal reports with detailed error analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).