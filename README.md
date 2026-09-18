# Parental Legacy & Life Factors Calculator

A React app that turns a date of birth into a reading across seven life
factors, each split between a **Mother** share and a **Father** share. The
factor totals always add up to exactly **100**, and the whole thing runs
client-side — no backend or database needed.

## Live demo

_Add your deployed URL here after running the deploy step below._

## Features

- 📅 Native date picker with validation (real calendar date, not in the future)
- ⚡ Auto-calculates the moment a date is chosen — no submit button
- 📊 Full Mother / Father / Total table for all seven life factors
- 🥇 Legacy banner showing which parent's total is higher, and by how much
- 📈 Radar chart (factor-by-factor) and donut chart (overall split), built with Recharts
- 📱 Responsive layout, down to small mobile screens
- 🌗 Dark / light mode toggle, persisted in `localStorage`
- 💾 Save readings for past dates and revisit them later (`localStorage`)
- 📄 Export the current reading as a PDF
- 📑 Export the current reading as a CSV

## How the calculation works

Each of the seven life factors carries a fixed pair of template values —
a `high` value and a `low` value (`src/utils/calculator.js`). These
magnitudes never change.

- **Odd day of birth** → Mother is assigned each factor's `high` value,
  Father gets `low`.
- **Even day of birth** → the assignment flips: Mother gets `low`, Father
  gets `high`.

So the numbers themselves are identical across every odd-day reading, and
identical across every even-day reading — only the Mother/Father labels
swap. Since every factor's `high + low` pair is fixed, Mother's total and
Father's total always add up to exactly 100, regardless of the date.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The static output lands in `dist/`.

## Deploying

Any static host works, since there's no backend:

- **Vercel**: import the repo, framework preset "Vite", no env vars needed.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build` and publish the `dist/` folder (e.g.
  with the `gh-pages` package or a GitHub Actions workflow).

## Project structure

```
src/
  components/     UI components (form, table, charts, exports, etc.)
  hooks/          useTheme (dark mode) and useSavedReadings (localStorage)
  utils/
    calculator.js  Core calculation engine + DOB validation
  App.jsx
  main.jsx
  index.css
```

## Tech stack

- React 18 (functional components + hooks)
- Tailwind CSS for styling
- Recharts for the radar and donut charts
- jsPDF + jspdf-autotable for PDF export
- Vite as the build tool

## Notes

- No backend or database is used — everything (theme preference and saved
  readings) is kept in the browser's `localStorage`.
- All calculation logic is pure and unit-testable, isolated in
  `src/utils/calculator.js`.
