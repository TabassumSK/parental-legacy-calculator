export default function LegacyBanner({ result, dateLabel }) {
  const { motherTotal, fatherTotal, higherParent, margin } = result;
  const motherPct = motherTotal; // totals sum to 100
  const fatherPct = fatherTotal;

  return (
    <section className="space-y-6">
      {/* 3 Compact Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Mother */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Mother
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {motherTotal.toFixed(3)}
            </span>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              {motherPct.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Card 2: Father */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400">
            Father
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {fatherTotal.toFixed(3)}
            </span>
            <span className="text-xs font-medium text-sky-600 dark:text-sky-400">
              {fatherPct.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Card 3: Dominant Parent */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Dominant Parent
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className={`text-2xl font-bold tracking-tight ${
              higherParent === "Mother"
                ? "text-amber-600 dark:text-amber-400"
                : higherParent === "Father"
                ? "text-sky-600 dark:text-sky-400"
                : "text-slate-900 dark:text-white"
            }`}>
              {higherParent}
            </span>
            {higherParent !== "Balanced" && (
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                +{margin.toFixed(3)} pts
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Concise Result Statement */}
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          {higherParent === "Balanced" ? (
            "Your legacy is evenly balanced between both parents."
          ) : (
            <>
              <span className={higherParent === "Mother" ? "text-amber-600 dark:text-amber-400" : "text-sky-600 dark:text-sky-400"}>
                {higherParent}
              </span>
              {" "}carries the stronger legacy
            </>
          )}
        </h2>
        {higherParent !== "Balanced" && (
          <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
            Leading by {margin.toFixed(3)} points across all 7 factors for DOB {dateLabel}.
          </p>
        )}
      </div>

      {/* EXPANDED PROMINENT VISUAL SPLIT BAR */}
      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
          <span>Overall Legacy Visual Split Ratio</span>
          <span>Total 100.000 pts</span>
        </div>

        {/* Increased Height & Prominent Length Bar */}
        <div className="relative flex h-7 w-full overflow-hidden rounded-xl bg-slate-100 p-0.5 shadow-inner dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700/60">
          <div
            className="flex items-center justify-start pl-3 text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-amber-500 rounded-l-lg transition-all duration-500"
            style={{ width: `${motherPct}%` }}
            title={`Mother: ${motherTotal.toFixed(3)} (${motherPct.toFixed(1)}%)`}
          >
            {motherPct > 25 && <span>Mother {motherPct.toFixed(1)}%</span>}
          </div>
          <div
            className="flex items-center justify-end pr-3 text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-sky-600 rounded-r-lg transition-all duration-500"
            style={{ width: `${fatherPct}%` }}
            title={`Father: ${fatherTotal.toFixed(3)} (${fatherPct.toFixed(1)}%)`}
          >
            {fatherPct > 25 && <span>Father {fatherPct.toFixed(1)}%</span>}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
            <span className="h-3 w-3 rounded-md bg-amber-500" />
            Mother: {motherTotal.toFixed(3)} ({motherPct.toFixed(1)}%)
          </span>
          <span className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400">
            Father: {fatherTotal.toFixed(3)} ({fatherPct.toFixed(1)}%)
            <span className="h-3 w-3 rounded-md bg-sky-500" />
          </span>
        </div>
      </div>
    </section>
  );
}
