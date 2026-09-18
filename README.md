# Parental Legacy & Life Factors Calculator

A responsive React + Vite app that turns a date of birth into a seven-factor parental legacy reading. Each factor is split between a Mother share and a Father share, and the totals always balance to 100.

## Live demo

Deployed URL:

- https://your-project-name.vercel.app

## Features

- 📅 Birth date input with validation and calendar-safe checks
- ⚡ Real-time calculation as soon as a valid date is selected
- 📊 Full seven-factor comparison table for Mother, Father, and Total
- 🥇 Legacy banner highlighting the higher parent and the difference
- 📈 Radar and donut chart views built with Recharts
- 📱 Responsive layout for desktop, tablet, and mobile screens
- 🌗 Light/dark mode toggle saved in localStorage
- 💾 Save and revisit readings locally in the browser
- 📄 Export the current reading as PDF
- 📑 Export the current reading as CSV

## How the calculation works

The calculator uses a fixed pair of values for each life factor in `src/utils/calculator.js`:

- `high` value
- `low` value

For each factor:

- If the day of birth is odd, Mother receives the `high` value and Father receives the `low` value.
- If the day of birth is even, the assignment is reversed.

Because the pairs always sum to the same total, Mother and Father totals always add up to exactly 100, regardless of the date.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

This generates a static production build in the `dist/` folder.

## Deploying

Because this app has no backend, it can be deployed to any static hosting service.

### Recommended options

- Vercel
  - Import the repo
  - Framework preset: Vite
  - No environment variables required

- Netlify
  - Build command: `npm run build`
  - Publish directory: `dist`

- GitHub Pages
  - Publish the generated `dist/` folder via GitHub Actions or the `gh-pages` package

## Project structure

```text
src/
  components/     UI blocks for the form, cards, charts, export buttons, and saved readings
  hooks/          theme and saved-readings logic
  utils/
    calculator.js  calculation engine and date validation
  App.jsx
  main.jsx
  index.css
```

## Tech stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- jsPDF + jspdf-autotable

## Notes

- No backend or database is required.
- Theme preference and saved readings are stored in the browser using `localStorage`.
- The core calculation logic is isolated in `src/utils/calculator.js` and is easy to test or extend.
