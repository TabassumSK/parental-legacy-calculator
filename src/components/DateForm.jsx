import { useState, useEffect } from "react";
import { validateDOB } from "../utils/calculator.js";

function toISODate(day, month, year) {
  if (!day || !month || !year) return "";
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

export default function DateForm({ dob, onCalculate }) {
  const [isoValue, setIsoValue] = useState("");
  const [error, setError] = useState("");

  const todayISO = new Date().toISOString().slice(0, 10);

  // Sync input value if dob changes externally (e.g. from Saved Readings selection)
  useEffect(() => {
    if (dob) {
      setIsoValue(toISODate(dob.day, dob.month, dob.year));
      setError("");
    }
  }, [dob]);

  const processDate = (val) => {
    setError("");
    if (!val) {
      setError("Please choose a date of birth.");
      return;
    }

    const [year, month, day] = val.split("-").map(Number);
    const check = validateDOB(day, month, year);
    if (!check.valid) {
      setError(check.error);
      return;
    }
    onCalculate({ day, month, year });
  };

  // ONLY update local state on calendar datepicker change — DO NOT calculate yet!
  const handleChange = (e) => {
    setIsoValue(e.target.value);
    setError("");
  };

  // Trigger calculation ONLY on button click or form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    processDate(isoValue);
  };

  // Sample date preset buttons
  const handlePreset = (presetDate) => {
    setIsoValue(presetDate);
    processDate(presetDate);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="dob"
          className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
        >
          Date of birth
        </label>
        
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1 flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="dob"
              type="date"
              value={isoValue}
              max={todayISO}
              min="1900-01-01"
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-sm font-medium text-slate-900 shadow-subtle outline-none transition duration-150 hover:border-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculate
          </button>
        </div>
      </div>

      {/* Subtle Preset Pills */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400">Sample date:</span>
        <button
          type="button"
          onClick={() => handlePreset("1995-05-15")}
          className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          15 May 1995
        </button>
        <button
          type="button"
          onClick={() => handlePreset("1998-08-22")}
          className="rounded-lg border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          22 Aug 1998
        </button>
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          Select a date and click Calculate to view your reading.
        </p>
      )}
    </form>
  );
}
