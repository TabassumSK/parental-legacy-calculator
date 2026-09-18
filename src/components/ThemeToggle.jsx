export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group flex h-9 w-16 items-center rounded-full border border-ink-900/15 bg-ink-900/5 px-1 transition-colors dark:border-parchment-100/15 dark:bg-parchment-100/10"
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-parchment-50 text-xs shadow-sm transition-transform duration-300 dark:bg-ink-800 ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
