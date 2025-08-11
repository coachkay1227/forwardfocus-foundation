import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ffe.learning.v1";

type CompletionState = {
  completed: Record<string, true>;
};

function loadState(): CompletionState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: {} };
    const parsed = JSON.parse(raw);
    return { completed: parsed.completed ?? {} } as CompletionState;
  } catch {
    return { completed: {} };
  }
}

function persist(state: CompletionState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function useLearningProgress() {
  const [state, setState] = useState<CompletionState>(() => loadState());

  useEffect(() => {
    persist(state);
  }, [state]);

  const isCompleted = useCallback(
    (moduleId: string) => Boolean(state.completed[moduleId]),
    [state.completed]
  );

  const toggleModule = useCallback((moduleId: string) => {
    setState((s) => {
      const next: CompletionState = { completed: { ...s.completed } };
      if (next.completed[moduleId]) delete next.completed[moduleId];
      else next.completed[moduleId] = true;
      return next;
    });
  }, []);

  const resetModules = useCallback((moduleIds: string[]) => {
    setState((s) => {
      const next: CompletionState = { completed: { ...s.completed } };
      for (const id of moduleIds) delete next.completed[id];
      return next;
    });
  }, []);

  const allCompletedIds = useMemo(() => new Set(Object.keys(state.completed)), [state.completed]);

  return { isCompleted, toggleModule, resetModules, allCompletedIds };
}
