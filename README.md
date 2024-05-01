# Vue TrelloPseudo

## Description

Vue TrelloPseudo is a Vue.js project that aims to mimic the functionality of Trello boards. It uses Vue 3, Vue Router, Pinia for state management, and Supabase for database integration.

## Prerequisites

Before running the project, make sure you have the following installed:

- Node.js (version 14.x or later)
- npm (Node Package Manager) or yarn

## Installation

1. Clone the repository to your local machine:


2. Navigate to the project directory:

    ```bash
    cd vue-trellopseudo
    ```

3. Install dependencies using npm or yarn:

    ```bash
    npm install
    ```

## Usage

### Development Mode

To run the project in development mode, use the following command:

```bash
npm run dev
```

This command will start the development server using Vite. Open your browser and navigate to `http://localhost:3000` to view the application.

### Build

To build the project for production, use the following command:

```bash
npm run build
```

This command will generate a production-ready build in the `dist` directory.

### Preview

To preview the production build locally, use the following command:

```bash
npm run preview
```

This command will serve the production build locally, allowing you to preview it in your browser.

## Linting and Formatting

### ESLint

To lint your code using ESLint, use the following command:

```bash
npm run lint
```

This command will run ESLint on all `.vue`, `.js`, `.jsx`, `.cjs`, and `.mjs` files in the project directory, fixing any fixable issues.

### Prettier

To format your code using Prettier, use the following command:

```bash
npm run format
```

This command will format all files in the `src` directory according to Prettier's rules.

## Environment Variables

The project uses environment variables for configuration. Create a `.env` file at the root of the project and define your environment variables there.

## Technologies Used

- Vue.js
- Vue Router
- Pinia
- Supabase
- Tailwind CSS

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.