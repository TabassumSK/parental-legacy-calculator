import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import DateForm from "./components/DateForm.jsx";
import LegacyBanner from "./components/LegacyBanner.jsx";
import ResultsPanel from "./components/ResultsPanel.jsx";
import ChartsSection from "./components/ChartsSection.jsx";
import ExportButtons from "./components/ExportButtons.jsx";
import SavedReadings from "./components/SavedReadings.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { useSavedReadings } from "./hooks/useSavedReadings.js";
import { calculateLegacy, formatDate } from "./utils/calculator.js";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { saved, saveReading, removeReading } = useSavedReadings();
  const [dob, setDob] = useState(null); // { day, month, year }

  const result = useMemo(() => {
    if (!dob) return null;
    return calculateLegacy(dob.day, dob.month, dob.year);
  }, [dob]);

  const dateLabel = dob ? formatDate(dob.day, dob.month, dob.year) : "";

  const handleSave = () => {
    if (!result) return;
    saveReading({
      id: `${dob.year}-${dob.month}-${dob.day}-${Date.now()}`,
      dateLabel,
      dob,
      higherParent: result.higherParent,
    });
  };

  const handleSelectSaved = (entry) => setDob(entry.dob);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Centered Container (Max Width ~1200px) */}
      <main className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 space-y-10">

        {/* Hero Section & DOB Input */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 dark:text-white">
            Parental Legacy & Life Factors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Explore your seven-factor parental legacy based on your date of birth.
          </p>

          <div className="pt-2">
            <DateForm onCalculate={setDob} />
          </div>
        </section>

        {/* Results Area (Appears cleanly after selecting DOB) */}
        {result ? (
          <div className="space-y-10">
            {/* Result Summary & Ratio Bar */}
            <LegacyBanner result={result} dateLabel={dateLabel} />

            {/* Factor Breakdown Table */}
            <ResultsPanel result={result} />

            {/* Visual Comparison Charts (Bar & Radar Tabs) */}
            <ChartsSection result={result} />

            {/* Export & Save Action Area */}
            <ExportButtons result={result} dateLabel={dateLabel} onSave={handleSave} />
          </div>
        ) : (
          <div className="rounded-xl border border-slate-300 bg-white p-8 text-center shadow-subtle dark:border-slate-800 dark:bg-slate-900 max-w-lg mx-auto">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Select your date of birth to generate your reading.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your maternal and paternal legacy shares across seven life factors will appear automatically.
            </p>
          </div>
        )}

        {/* Saved Readings Section */}
        <SavedReadings
          saved={saved}
          onSelect={handleSelectSaved}
          onRemove={removeReading}
        />
      </main>

      {/* Small Footer */}
      <footer className="w-full border-t border-slate-300 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Parental Legacy & Life Factors Calculator · Runs entirely in your browser
      </footer>
    </div>
  );
}
