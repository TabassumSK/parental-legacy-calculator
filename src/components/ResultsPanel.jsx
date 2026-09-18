export default function ResultsPanel({ result }) {
  const { rows, motherTotal, fatherTotal, grandTotal } = result;

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Life Factor Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Mother and Father contribution across the seven life factors with visual split analysis.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-subtle dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                <th scope="col" className="px-5 py-3.5">Life Factor</th>
                <th scope="col" className="px-5 py-3.5 text-center">Visual Split Ratio</th>
                <th scope="col" className="px-5 py-3.5 text-right text-amber-700 dark:text-amber-400">Mother</th>
                <th scope="col" className="px-5 py-3.5 text-right text-sky-700 dark:text-sky-400">Father</th>
                <th scope="col" className="px-5 py-3.5 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {rows.map((row) => {
                const mRatio = (row.mother / row.total) * 100;
                const fRatio = (row.father / row.total) * 100;

                return (
                  <tr
                    key={row.key}
                    className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 dark:text-white">{row.name}</span>
                        <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                          Range: {row.min.toFixed(3)}–{row.max.toFixed(3)}
                        </span>
                      </div>
                    </td>

                    {/* EXPANDED VISUAL SPLIT COLUMN */}
                    <td className="px-5 py-3.5 text-center align-middle">
                      <div className="mx-auto flex h-3.5 min-w-[160px] max-w-[220px] overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-200 dark:ring-slate-700/60 p-0.5">
                        <div
                          className="h-full bg-amber-500 rounded-l-sm transition-all duration-300"
                          style={{ width: `${mRatio}%` }}
                          title={`Mother: ${row.mother.toFixed(3)} (${mRatio.toFixed(1)}%)`}
                        />
                        <div
                          className="h-full bg-sky-500 rounded-r-sm transition-all duration-300"
                          style={{ width: `${fRatio}%` }}
                          title={`Father: ${row.father.toFixed(3)} (${fRatio.toFixed(1)}%)`}
                        />
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right font-mono font-semibold tabular-nums text-amber-600 dark:text-amber-400">
                      {row.mother.toFixed(3)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-semibold tabular-nums text-sky-600 dark:text-sky-400">
                      {row.father.toFixed(3)}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold tabular-nums text-slate-900 dark:text-white">
                      {row.total.toFixed(3)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-slate-50 font-bold dark:border-slate-700 dark:bg-slate-800/70">
                <th scope="row" colSpan={2} className="px-5 py-4 text-slate-900 dark:text-white font-bold">
                  Grand Total
                </th>
                <td className="px-5 py-4 text-right font-mono text-amber-700 dark:text-amber-400 font-bold">
                  {motherTotal.toFixed(3)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-sky-700 dark:text-sky-400 font-bold">
                  {fatherTotal.toFixed(3)}
                </td>
                <td className="px-5 py-4 text-right font-mono text-slate-900 dark:text-white font-bold">
                  {grandTotal.toFixed(3)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
