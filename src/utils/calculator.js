// Parental Legacy & Life Factors Calculator — core engine
//
// Design notes:
// - Each life factor carries a fixed pair of template values (`high` and
//   `low`) taken from the reference dataset. These magnitudes never change.
// - The day of birth decides *assignment only*: on an odd day, Mother gets
//   the `high` value and Father gets the `low` value for every factor; on
//   an even day the assignment flips. The numbers themselves are identical
//   across all odd days, and identical across all even days — only the
//   labels swap.
// - Because every factor's high+low pair is fixed, Mother's total + Father's
//   total is guaranteed to equal 100 regardless of which day it is.
// - `min`/`max` are kept only as the descriptive range shown in the UI.

export const FACTORS = [
  { key: "genetic", name: "Genetic Inheritance", min: 9.333, max: 10.777, high: 10.719, low: 10.233 },
  { key: "constitutional", name: "Constitutional Vitality", min: 8.111, max: 9.111, high: 8.545, low: 8.198 },
  { key: "mental", name: "Mental Patterns", min: 6.111, max: 7.111, high: 6.611, low: 6.588 },
  { key: "intellectual", name: "Intellectual Capacity", min: 6.333, max: 6.999, high: 6.443, low: 6.316 },
  { key: "emotional", name: "Emotional Foundation", min: 7.111, max: 7.999, high: 7.382, low: 6.606 },
  { key: "spiritual", name: "Spiritual Lineage", min: 5.011, max: 6.011, high: 5.975, low: 5.109 },
  { key: "soul", name: "Soul Connections", min: 5.111, max: 6.222, high: 6.162, low: 5.113 },
];

function round3(n) {
  return Math.round((n + Number.EPSILON) * 1000) / 1000;
}

/**
 * Validate a DOB given as { day, month, year } (1-indexed month).
 * Returns { valid: boolean, error?: string }
 */
export function validateDOB(day, month, year) {
  if (!day || !month || !year) {
    return { valid: false, error: "Please choose a complete date of birth." };
  }
  const date = new Date(year, month - 1, day);
  const isRealDate =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day);
  if (!isRealDate) {
    return { valid: false, error: "That date doesn't exist on the calendar." };
  }
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (date > today) {
    return { valid: false, error: "Date of birth can't be in the future." };
  }
  const earliest = new Date(1900, 0, 1);
  if (date < earliest) {
    return { valid: false, error: "Please choose a date after 1 Jan 1900." };
  }
  return { valid: true };
}

/**
 * Core calculation. day/month/year are numbers.
 */
export function calculateLegacy(day, month, year) {
  const isOdd = day % 2 === 1;

  // Odd day → Mother takes each factor's "high" template value, Father
  // takes "low". Even day → the assignment flips. The magnitudes themselves
  // never change; only who they belong to does.
  const rows = FACTORS.map((f) => {
    const mother = isOdd ? f.high : f.low;
    const father = isOdd ? f.low : f.high;
    return { ...f, mother, father, total: round3(mother + father) };
  });

  const motherTotal = round3(rows.reduce((s, r) => s + r.mother, 0));
  const fatherTotal = round3(rows.reduce((s, r) => s + r.father, 0));
  const grandTotal = round3(motherTotal + fatherTotal);

  const higherParent =
    motherTotal === fatherTotal ? "Balanced" : motherTotal > fatherTotal ? "Mother" : "Father";
  const margin = round3(Math.abs(motherTotal - fatherTotal));

  return {
    rows,
    motherTotal,
    fatherTotal,
    grandTotal,
    isOdd,
    higherParent,
    margin,
  };
}

export function formatDate(day, month, year) {
  const d = String(day).padStart(2, "0");
  const m = String(month).padStart(2, "0");
  return `${d}/${m}/${year}`;
}
