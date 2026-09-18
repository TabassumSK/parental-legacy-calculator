export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-base shadow-subtle transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 cursor-pointer"
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
}
