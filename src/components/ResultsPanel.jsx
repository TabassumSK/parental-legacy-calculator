export default function ResultsPanel({ result }) {
  const { rows, motherTotal, fatherTotal, grandTotal } = result;

  return (
    <div className="glass-card overflow-hidden shadow-xl">
      <div className="border-b border-slate-200/80 px-6 py-4 dark:border-slate-800/80 flex items-center justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          Factor Breakdown Table
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          7 Core Factors
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-900/60 dark:text-slate-400 border-b border-slate-200/80 dark:border-slate-800/80">
              <th className="px-5 py-3.5 font-heading">Life Factor</th>
              <th className="px-4 py-3.5 text-center font-heading">Visual Split</th>
              <th className="px-5 py-3.5 text-right font-heading text-amber-600 dark:text-amber-400">Mother</th>
              <th className="px-5 py-3.5 text-right font-heading text-sky-600 dark:text-sky-400">Father</th>
              <th className="px-5 py-3.5 text-right font-heading text-slate-700 dark:text-slate-300">Factor Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
            {rows.map((row) => {
              const mRatio = (row.mother / row.total) * 100;
              const fRatio = (row.father / row.total) * 100;

              return (
                <tr
                  key={row.key}
                  className="transition duration-150 hover:bg-amber-500/5 dark:hover:bg-amber-500/10"
                >
                  <td className="px-5 py-3.5 text-left font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{row.name}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Range: {row.min.toFixed(3)} – {row.max.toFixed(3)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center align-middle">
                    <div className="mx-auto flex h-2.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                      <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${mRatio}%` }}
                        title={`Mother: ${row.mother.toFixed(3)} (${mRatio.toFixed(0)}%)`}
                      />
                      <div
                        className="h-full bg-sky-500 transition-all duration-300"
                        style={{ width: `${fRatio}%` }}
                        title={`Father: ${row.father.toFixed(3)} (${fRatio.toFixed(0)}%)`}
                      />
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                    {row.mother.toFixed(3)}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm font-semibold tabular-nums text-sky-600 dark:text-sky-400">
                    {row.father.toFixed(3)}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono text-sm font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    {row.total.toFixed(3)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-300 bg-slate-100/80 font-semibold dark:border-slate-700 dark:bg-slate-900/90">
              <td className="px-5 py-4 text-left font-heading text-base font-bold text-slate-900 dark:text-slate-100" colSpan={2}>
                Grand Total (Sum of 7 Factors)
              </td>
              <td className="px-5 py-4 text-right font-mono text-base font-bold tabular-nums text-amber-600 dark:text-amber-400">
                {motherTotal.toFixed(3)}
              </td>
              <td className="px-5 py-4 text-right font-mono text-base font-bold tabular-nums text-sky-600 dark:text-sky-400">
                {fatherTotal.toFixed(3)}
              </td>
              <td className="px-5 py-4 text-right font-mono text-base font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {grandTotal.toFixed(3)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
