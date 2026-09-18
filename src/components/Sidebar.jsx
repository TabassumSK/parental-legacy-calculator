import SavedReadings from "./SavedReadings.jsx";

export default function Sidebar({
  saved,
  onSelectSaved,
  onRemoveSaved,
}) {
  return (
    <aside className="w-full">
      <SavedReadings
        saved={saved}
        onSelect={onSelectSaved}
        onRemove={onRemoveSaved}
      />
    </aside>
  );
}
