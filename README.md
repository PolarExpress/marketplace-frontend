# frontend-standalone

This is the standalone version of the frontend for the GraphPolaris add-on marketplace.

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

## Installation

Before starting the application, you need to do the following steps:

1. Install dependencies via `npm i`;
2. Create a `.env` file, when running with the dev container you can simply run `cp sample.env .env`.

## Scripts

Use with `npm run <arg>`, where `<arg>` is one of the following:

- `dev` - start dev server with msw mocking
- `start` - start dev server without mocking
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner
- `storybook` - start Storybook.js.  
  Note: by adding `?path=/onboarding` to the URL (or replacing an existing path if it is already there), a short guide to Storybook.js will be started. This is only possible as long as the default stories exist.
- `test-storybook` - run the storybook tests and produces a coverage report. Requires a local running instance of storybook.
- `test-storybook:ci` - builds storybook and run the storybook tests. Must not have an instance of storybook running.
- `build-tailwind` - rebuild the Tailwind CSS stylesheet.
- `format` - run Prettier on the code.
- `lint` - run eslint on the code. Append ` -- --fix` to also attempt to automatically fix problems it encounters.

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
