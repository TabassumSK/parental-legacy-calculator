export default function SavedReadings({ saved, onSelect, onRemove, onSave, canSave }) {
  return (
    <div className="glass-card p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 dark:border-slate-800/80">
          <p className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            Saved Readings
          </p>
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="rounded-lg bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20 transition"
          >
            + Save current
          </button>
        </div>

        {saved.length === 0 ? (
          <div className="mt-6 text-center py-4">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No saved readings yet. Calculate a date above and save to compare later.
            </p>
          </div>
        ) : (
          <ul className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
            {saved.map((entry) => (
              <li
                key={entry.id}
                className="group flex items-center justify-between gap-2 rounded-xl border border-slate-200/80 bg-white/60 p-2.5 text-xs transition duration-200 hover:border-amber-500/40 hover:bg-amber-500/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-amber-500/40 dark:hover:bg-amber-500/10"
              >
                <button
                  type="button"
                  onClick={() => onSelect(entry)}
                  className="flex flex-1 items-center justify-between text-left"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                    {entry.dateLabel}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${entry.higherParent === "Mother"
                        ? "bg-amber-500/10 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"
                        : entry.higherParent === "Father"
                          ? "bg-sky-500/10 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                  >
                    {entry.higherParent}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  aria-label={`Remove saved reading for ${entry.dateLabel}`}
                  className="p-1 text-slate-400 hover:text-red-500 transition opacity-60 group-hover:opacity-100"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
        Saved locally in browser storage.
      </p>
    </div>
  );
}
