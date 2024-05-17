# Frontend Standalone

This is the standalone version of the frontend for the GraphPolaris add-on marketplace.

It uses [Vite](https://vitejs.dev/) and [Vitest](https://vitest.dev/) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/).

## Installation

Before starting the application, you need to complete the following steps:

1. Install dependencies via `pnpm i`.
2. Create a `.env` file by running `cp sample.env .env`.

## Scripts

Use with `pnpm <arg>`, where `<arg>` is one of the following:

- `dev` - Start the dev server with MSW mocking.
- `start` - Start the dev server without mocking.
- `build` - Build for production.
- `preview` - Locally preview the production build.
- `test` - Launch the test runner.
- `build-tailwind` - Rebuild the Tailwind CSS stylesheet.
- `format` - Run Prettier on the code.
- `lint` - Run ESLint on the code. Append `:fix` to also attempt to automatically fix problems it encounters.

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
