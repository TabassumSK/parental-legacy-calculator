export default function LegacyBanner({ result, dateLabel }) {
  const { motherTotal, fatherTotal, higherParent, margin, isOdd } = result;
  const motherPct = motherTotal; // totals already sum to 100
  const fatherPct = fatherTotal;

  return (
    <div className="glass-card p-6 shadow-xl relative overflow-hidden">
      {/* Decorative ambient background glow */}
      <div
        className={`absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl opacity-20 pointer-events-none ${higherParent === "Mother" ? "bg-amber-500" : "bg-sky-500"
          }`}
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-3.5 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-amber-500/10 px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
            Reading Result
          </span>
          <span className="font-heading text-xs text-slate-500 dark:text-slate-400">
            DOB: <strong className="text-slate-900 dark:text-slate-200 font-semibold">{dateLabel}</strong>
          </span>
        </div>
        <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          {isOdd ? "Odd birth day assignment" : "Even birth day assignment"}
        </span>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
            {higherParent === "Balanced" ? (
              "Your Legacy is Perfectly Balanced"
            ) : (
              <>
                <span className={higherParent === "Mother" ? "text-amber-600 dark:text-amber-400" : "text-sky-600 dark:text-sky-400"}>
                  {higherParent}
                </span>
                {" "}carries the dominant legacy
              </>
            )}
          </h2>
          {higherParent !== "Balanced" && (
            <p className="mt-1 font-body text-sm text-slate-500 dark:text-slate-400">
              Leading by a total margin of <strong className="font-semibold text-slate-700 dark:text-slate-300">{margin.toFixed(3)} points</strong> across all 7 factors.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="rounded-xl bg-amber-500/10 dark:bg-amber-500/15 p-3 text-center min-w-[90px] border border-amber-500/20">
            <span className="block text-xs font-semibold text-amber-700 dark:text-amber-300">Mother</span>
            <span className="font-heading text-lg font-bold text-amber-600 dark:text-amber-400">{motherTotal.toFixed(3)}</span>
          </div>
          <div className="text-slate-400 font-display font-light text-xl">:</div>
          <div className="rounded-xl bg-sky-500/10 dark:bg-sky-500/15 p-3 text-center min-w-[90px] border border-sky-500/20">
            <span className="block text-xs font-semibold text-sky-700 dark:text-sky-300">Father</span>
            <span className="font-heading text-lg font-bold text-sky-600 dark:text-sky-400">{fatherTotal.toFixed(3)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-l-full transition-all duration-700 ease-out"
            style={{ width: `${motherPct}%` }}
            aria-hidden="true"
          />
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-r-full transition-all duration-700 ease-out"
            style={{ width: `${fatherPct}%` }}
            aria-hidden="true"
          />
        </div>
        <div className="mt-2.5 flex justify-between text-xs font-medium">
          <span className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-amber-500/30" />
            Maternal Legacy ({motherPct.toFixed(1)}%)
          </span>
          <span className="flex items-center gap-2 text-sky-700 dark:text-sky-300">
            Paternal Legacy ({fatherPct.toFixed(1)}%)
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500 ring-2 ring-sky-500/30" />
          </span>
        </div>
      </div>
    </div>
  );
}
