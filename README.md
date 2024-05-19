# PolarExpress Frontend

This is the standalone version of the frontend for the GraphPolaris add-on marketplace.

## Requirements

- A running instance of the marketplace backend
- A running instance of the GraphPolaris infrastructure, specifically the User Management Service.
- Node.js 21 or later
- pnpm

## Installation

Before starting the application, ensure the following services are running:

1. The backend on the port specified in the `.env` file.
2. The User Management Service in Docker on the port specified in the `.env` file.

Next, follow these steps:

1. Create a `.env` file and set the required environment variables to match
your setup. For an example, see the `sample.env` file.
2. Install the dependencies using `pnpm i`.
3. Run `pnpm start` to start the frontend.

## Scripts

To manage the application, use `pnpm <script>`, where `<script>` is one of the following:

- `dev` - Start the development server with MSW mocking.
- `start` - Start the development server without mocking.
- `build` - Build the application for production.
- `preview` - Locally preview the production build.
- `test` - Launch the test runner.
- `build-tailwind` - Rebuild the Tailwind CSS stylesheet.
- `format` - Run Prettier to format the code.
- `lint` - Run ESLint to lint the code.
- `lint:fix` - Automatically fix ESLint issues.

## Inspiration

- [Create React App](https://create-react-app.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)