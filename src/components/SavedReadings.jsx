export default function SavedReadings({ saved, onSelect, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          Saved Readings
        </h3>
        <span className="text-[10px] font-semibold text-slate-400">
          {saved.length} stored
        </span>
      </div>

      {saved.length === 0 ? (
        <div className="py-4 text-center">
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            No saved readings yet.
          </p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            Save a reading to compare it later.
          </p>
        </div>
      ) : (
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {saved.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50/70 p-2.5 text-xs transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700"
            >
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-white font-mono">
                  {entry.dateLabel}
                </span>
                <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  Higher: <strong className={entry.higherParent === "Mother" ? "text-amber-600 dark:text-amber-400" : "text-sky-600 dark:text-sky-400"}>{entry.higherParent}</strong>
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(entry)}
                  className="rounded-md bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-slate-800 dark:bg-amber-500 dark:text-slate-950 dark:hover:bg-amber-400 transition cursor-pointer"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  aria-label={`Remove saved reading for ${entry.dateLabel}`}
                  className="p-1 text-slate-400 hover:text-red-500 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
