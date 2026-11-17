# Portfolio · Alejandro Cabrera Mateo

[![CI and deploy](https://github.com/alecabreradev/alecabreradev.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/alecabreradev/alecabreradev.github.io/actions/workflows/deploy.yml)

My personal portfolio, built with **React** and **Vite** and published on GitHub Pages:
**[alecabreradev.github.io](https://alecabreradev.github.io)**

Instead of screenshots, each project has something you can try:

- **Skill network**: an SVG graph linking areas of knowledge, tools and projects. Hover a node to see its connections, or click a project to open it.
- **Corte & Arte**: a working recreation of my Android booking app. Log in, create, edit or delete bookings and watch the REST API requests the real app would send.
- **Madrid NO₂ forecast**: the real test-period predictions of my machine learning model, drawn on a canvas. Move the decision threshold and precision, recall and F1 update live.

The site is bilingual (Spanish and English), has light and dark themes, works on mobile and respects the reduced-motion setting.

## Tech stack

- React 18 and Vite 5
- Plain CSS with design tokens, one stylesheet per component (BEM naming)
- Vitest for unit tests, ESLint and Prettier for code quality
- GitHub Actions: lint, format check, tests, build and deploy to GitHub Pages on every push

## Project structure

```
src/
├── components/          Shared UI: SiteHeader, SiteFooter, Section
├── sections/            Page sections: Hero, About, Projects, Timeline, Contact
├── features/
│   ├── skill-network/   Network layout (pure functions + tests), pulse animation, component
│   ├── corte-arte-demo/ Phone screens, reducer with the app logic, validation (+ tests)
│   └── no2-demo/        Metrics (+ tests), canvas chart, threshold explorer
├── data/                Profile, projects, skills and the NO₂ model results (JSON)
├── i18n/                Language provider, useLanguage hook, es/en locales (+ test)
├── hooks/               useTheme, useElementWidth
├── styles/              Design tokens, base styles and shared utilities
└── utils/               Small helpers
```

Logic that can be tested without a browser (the network layout, the classification metrics,
the booking validation and the demo reducer) lives in plain JavaScript modules with their own tests.

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev            # development server at http://localhost:5173
```

| Script            | What it does                            |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Starts the development server           |
| `npm run build`   | Builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally     |
| `npm test`        | Runs the unit tests                     |
| `npm run lint`    | Checks the code with ESLint             |
| `npm run format`  | Formats every file with Prettier        |

## Deployment

Every push to `main` runs the workflow in `.github/workflows/deploy.yml`, which checks the code,
builds the site and publishes it to GitHub Pages. In the repository settings, **Pages → Source**
must be set to **GitHub Actions**.

## Projects shown

- [Corte & Arte](https://github.com/alecabreradev/CorteyArte): Android app (Kotlin, Jetpack Compose) and React website sharing a Node.js + MongoDB REST API.
- [Madrid NO₂ forecast](https://github.com/alecabreradev/madrid-no2-forecast-project): next-day prediction of high-pollution days with scikit-learn and XGBoost.

## Contact

[LinkedIn](https://www.linkedin.com/in/alejandro-cabrera-mateo-6761b030b/) · [GitHub](https://github.com/alecabreradev)

## License

[MIT](LICENSE)
