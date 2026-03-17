# GDS Design System

A design hub for GOV.UK One Login, providing reusable components, patterns and guidance to help teams create consistent journeys.

## Prerequisites

- [Node.js](https://nodejs.org/) (see `.nvmrc` or `.node-version` for the required version)
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

The site will be available at `http://localhost:8080`.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Start the Eleventy dev server with live reload |
| `npm run build` | Build the static site to `docs/` |
| `npm test` | Run Playwright end-to-end tests |
| `npm run test:ui` | Run Playwright tests with the interactive UI |

## Docker

Build and run the site using Docker (served via nginx on port 80):

```bash
docker build -t di-design-system .
docker run -d -p 8080:80 --name di-design-system di-design-system
```

Then open `http://localhost:8080`.

## Project structure

```
src/
├── _layouts/         # Nunjucks layout templates
├── progress-button/  # Progress button component
│   ├── macro.njk
│   ├── template.njk
│   ├── _index.scss
│   └── progress-button.yaml
├── components.njk    # Components index page
├── index.njk         # Home page
├── patterns.njk      # Patterns index page
└── ...
docs/                 # Built output (committed for GitHub Pages)
tests/                # Playwright tests
```

## Contributing

See [CONTRIBUTORS.md](./CONTRIBUTORS.md) for guidance on how to contribute.

## Licence

[ISC](https://opensource.org/licenses/ISC)
