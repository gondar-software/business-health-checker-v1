# React Vite Business Health Checker

This project is a React application built using Vite and TypeScript. It serves as a business health dashboard to assess various business areas and dimensions.

## Getting Started

To create a new React project using Vite, run the following command:

```
npm create vite@latest react-vite-business-health-checker -- --template react-ts
```

After running the command, navigate to the project directory and install the dependencies:

```
cd react-vite-business-health-checker
npm install
```

## Project Structure

The project consists of the following main directories and files:

- `public/`: Contains static assets like images.
- `src/`: Contains the main application code.
  - `components/`: Contains React components, including the main dashboard.
  - `assets/`: Contains additional assets like logos.
  - `App.tsx`: The main application component.
  - `main.tsx`: The entry point of the application.
  - `index.css`: Global styles for the application.
  - `vite-env.d.ts`: TypeScript definitions for Vite.
- `package.json`: Contains project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `vite.config.ts`: Vite configuration file.
- `index.html`: The main HTML file for the application.

## Usage

To start the development server, run:

```
npm run dev
```

This will start the Vite development server and open the application in your default web browser.

## License

This project is licensed under the MIT License.