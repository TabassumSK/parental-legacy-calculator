import ThemeToggle from "./ThemeToggle.jsx";

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3.5">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 via-slate-900/10 to-sky-500/20 p-2 ring-1 ring-amber-500/30 dark:ring-amber-500/20">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="drop-shadow">
              <circle cx="12" cy="14" r="8" fill="url(#motherGrad)" fillOpacity="0.85" />
              <circle cx="20" cy="18" r="8" fill="url(#fatherGrad)" fillOpacity="0.85" />
              <defs>
                <linearGradient id="motherGrad" x1="4" y1="6" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="fatherGrad" x1="12" y1="10" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#0284C7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <span className="font-display text-lg font-bold tracking-wide text-slate-900 dark:text-slate-100">
              PARENTAL LEGACY
            </span>
            <span className="ml-2.5 rounded-full bg-amber-500/10 px-2 py-0.5 font-heading text-[10px] font-semibold uppercase tracking-wider text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
              Factor Calculator
            </span>
          </div>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
