import { useState } from "react";
import { validateDOB } from "../utils/calculator.js";

export default function DateForm({ onCalculate }) {
  const [isoValue, setIsoValue] = useState("");
  const [error, setError] = useState("");

  const todayISO = new Date().toISOString().slice(0, 10);

  const processDate = (val) => {
    setIsoValue(val);
    setError("");

    if (!val) return;

    const [year, month, day] = val.split("-").map(Number);
    const check = validateDOB(day, month, year);
    if (!check.valid) {
      setError(check.error);
      return;
    }
    onCalculate({ day, month, year });
  };

  const handleChange = (e) => {
    processDate(e.target.value);
  };

  const handlePreset = (presetDate) => {
    processDate(presetDate);
  };

  return (
    <form className="w-full" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="dob"
          className="font-heading text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-200 flex items-center gap-2"
        >
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Date of Birth
        </label>
        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          Instant calculation
        </span>
      </div>

      <div className="relative">
        <input
          id="dob"
          type="date"
          value={isoValue}
          max={todayISO}
          min="1900-01-01"
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3.5 font-body text-base text-slate-900 shadow-sm outline-none transition duration-200 hover:border-amber-500/50 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700/80 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-amber-500/50 dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quick presets:</span>
        <button
          type="button"
          onClick={() => handlePreset("1995-05-15")}
          className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-amber-500/10 hover:text-amber-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-amber-400/10 dark:hover:text-amber-300 transition"
        >
          15 May 1995 (Odd)
        </button>
        <button
          type="button"
          onClick={() => handlePreset("1998-08-22")}
          className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-sky-500/10 hover:text-sky-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-sky-400/10 dark:hover:text-sky-300 transition"
        >
          22 Aug 1998 (Even)
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
      {!error && (
        <p className="mt-2.5 text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Your factors update live upon date selection. Data stays strictly private in your browser.
        </p>
      )}
    </form>
  );
}
