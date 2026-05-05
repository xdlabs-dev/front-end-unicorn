# front-end-unicorn

A modern front-end project built with **React**, **TypeScript**, and **Vite**.

## Tech Stack

- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Vite](https://vite.dev/) — Fast build tool & dev server
- [Vitest](https://vitest.dev/) — Unit testing framework
- [Testing Library](https://testing-library.com/) — Component testing utilities
- [ESLint](https://eslint.org/) — Code linting

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── test/
│   └── setup.ts     # Test setup (jest-dom matchers)
├── App.css          # App-level styles
├── App.test.tsx     # App component tests
├── App.tsx          # Root application component
├── index.css        # Global styles
└── main.tsx         # Application entry point
```
