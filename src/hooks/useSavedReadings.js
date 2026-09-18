import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "plc-saved-readings";
const MAX_SAVED = 8;

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(list) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage full or unavailable; fail silently, UI still works in-session
  }
}

export function useSavedReadings() {
  const [saved, setSaved] = useState(load);

  useEffect(() => {
    persist(saved);
  }, [saved]);

  const saveReading = useCallback((entry) => {
    setSaved((prev) => {
      const withoutDup = prev.filter((r) => r.dateLabel !== entry.dateLabel);
      return [entry, ...withoutDup].slice(0, MAX_SAVED);
    });
  }, []);

  const removeReading = useCallback((id) => {
    setSaved((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const clearAll = useCallback(() => setSaved([]), []);

  return { saved, saveReading, removeReading, clearAll };
}
