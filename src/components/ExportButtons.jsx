import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCSV(result, dateLabel) {
  const header = ["Life Factor", "Mother", "Father", "Total", "Min", "Max"];
  const lines = [header.join(",")];
  result.rows.forEach((r) => {
    lines.push(
      [r.name, r.mother.toFixed(3), r.father.toFixed(3), r.total.toFixed(3), r.min.toFixed(3), r.max.toFixed(3)].join(",")
    );
  });
  lines.push("");
  lines.push(["Mother Total", result.motherTotal.toFixed(3)].join(","));
  lines.push(["Father Total", result.fatherTotal.toFixed(3)].join(","));
  lines.push(["Grand Total", result.grandTotal.toFixed(3)].join(","));
  lines.push("");
  lines.push(["Date of Birth", dateLabel].join(","));
  lines.push(["Higher Legacy", result.higherParent].join(","));
  return lines.join("\n");
}

export default function ExportButtons({ result, dateLabel }) {
  const handleExportCSV = () => {
    const csv = toCSV(result, dateLabel);
    downloadBlob(csv, `parental-legacy-${dateLabel.replace(/\//g, "-")}.csv`, "text/csv;charset=utf-8;");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Parental Legacy & Life Factors Reading", 14, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Date of birth: ${dateLabel}`, 14, 27);
    doc.text(
      `Higher legacy: ${result.higherParent}${result.higherParent !== "Balanced" ? ` (by ${result.margin.toFixed(3)} pts)` : ""
      }`,
      14,
      34
    );

    autoTable(doc, {
      startY: 40,
      head: [["Life Factor", "Mother", "Father", "Total"]],
      body: result.rows.map((r) => [
        r.name,
        r.mother.toFixed(3),
        r.father.toFixed(3),
        r.total.toFixed(3),
      ]),
      foot: [
        [
          "Grand Total",
          result.motherTotal.toFixed(3),
          result.fatherTotal.toFixed(3),
          result.grandTotal.toFixed(3),
        ],
      ],
      headStyles: { fillColor: [18, 20, 29] },
      footStyles: { fillColor: [242, 239, 231], textColor: [20, 20, 20] },
      styles: { fontSize: 10 },
    });

    doc.save(`parental-legacy-${dateLabel.replace(/\//g, "-")}.pdf`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 glass-card p-4">
      <div className="flex items-center gap-2">
        <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span className="font-heading text-sm font-bold text-slate-800 dark:text-slate-200">
          Export Reading Report
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleExportPDF}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-amber-700 hover:shadow-lg active:scale-[0.98]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 1H7a2 2 0 00-2 2v16a2 2 0 002 2z" />
          </svg>
          Export Document (PDF)
        </button>
        <button
          type="button"
          onClick={handleExportCSV}
          className="flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white/80 px-4 py-2.5 text-xs font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 active:scale-[0.98]"
        >
          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Raw Data (CSV)
        </button>
      </div>
    </div>
  );
}
