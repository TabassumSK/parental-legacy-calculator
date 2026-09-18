import { useRef } from "react";
import DateForm from "./DateForm.jsx";
import SavedReadings from "./SavedReadings.jsx";
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

export default function Sidebar({
  onCalculate,
  result,
  dateLabel,
  saved,
  onSelectSaved,
  onRemoveSaved,
  onSaveReading,
  activeView,
  onSelectView,
}) {
  const fileInputRef = useRef(null);

  const handleExportCSV = () => {
    if (!result) return;
    const csv = toCSV(result, dateLabel);
    downloadBlob(csv, `parental-legacy-${dateLabel.replace(/\//g, "-")}.csv`, "text/csv;charset=utf-8;");
  };

  const handleExportPDF = () => {
    if (!result) return;
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

  const handleImportCSV = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content !== "string") return;

      const lines = content.split("\n");
      let foundDate = null;
      for (const line of lines) {
        if (line.toLowerCase().includes("date of birth")) {
          const parts = line.split(",");
          if (parts.length >= 2) {
            foundDate = parts[1].trim();
          }
        }
      }

      if (foundDate) {
        let day, month, year;
        if (foundDate.includes("/")) {
          [day, month, year] = foundDate.split("/").map(Number);
        } else if (foundDate.includes("-")) {
          [year, month, day] = foundDate.split("-").map(Number);
        }
        if (day && month && year) {
          onCalculate({ day, month, year });
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <aside className="space-y-6">
      {/* Sidebar Section 1: Date Input & Quick Presets */}
      <div className="glass-card p-5 shadow-lg">
        <DateForm onCalculate={onCalculate} />
      </div>

      {/* Sidebar Section 2: Visualize Controls */}
      <div className="glass-card p-5 shadow-lg">
        <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-3 border-b border-slate-200/60 pb-2.5 dark:border-slate-800/80">
          <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Visualize Options
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onSelectView("all")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition text-left ${activeView === "all"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
          >
            📊 All Graphs
          </button>
          <button
            type="button"
            onClick={() => onSelectView("bar")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition text-left ${activeView === "bar"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
          >
            📊 Bar Chart
          </button>
          <button
            type="button"
            onClick={() => onSelectView("radar")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition text-left ${activeView === "radar"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
          >
            🕸️ Radar Chart
          </button>
          <button
            type="button"
            onClick={() => onSelectView("table")}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition text-left ${activeView === "table"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
          >
            📋 Report Table
          </button>
        </div>
      </div>

      {/* Sidebar Section 3: Export & Import Suite */}
      <div className="glass-card p-5 shadow-lg space-y-3">
        <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200/60 pb-2.5 dark:border-slate-800/80">
          <svg className="w-4 h-4 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Import & Export Suite
        </h4>

        <div className="space-y-2">
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={!result}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition hover:from-amber-600 hover:to-amber-700 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            📄 Export PDF Report
          </button>
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={!result}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300/80 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            📊 Export CSV Data
          </button>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleImportCSV}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-sky-500/50 bg-sky-500/5 px-3.5 py-2.5 text-xs font-semibold text-sky-700 hover:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-400/10 transition active:scale-[0.98]"
            >
              📥 Import CSV Reading
            </button>
            <p className="mt-1 text-[11px] text-center text-slate-400">
              Upload a saved CSV file to load reading
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Section 4: Saved Readings */}
      <SavedReadings
        saved={saved}
        onSelect={onSelectSaved}
        onRemove={onRemoveSaved}
        onSave={onSaveReading}
        canSave={Boolean(result)}
      />
    </aside>
  );
}
