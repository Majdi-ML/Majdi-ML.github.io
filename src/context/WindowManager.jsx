import { createContext, useContext, useReducer, useCallback, useMemo } from 'react';

const WindowManagerContext = createContext(null);

const BASE_Z = 100;

/**
 * state.windows: { [id]: { isOpen, isMinimized, z } }
 * Each window keeps its own `z` so inactive windows preserve their stacking
 * order, and closing/minimizing hands focus to the next topmost window.
 */
const initialState = { windows: {}, zCounter: BASE_Z, activeWindow: null };

function topVisible(windows, excludeId) {
  let top = null;
  for (const [id, w] of Object.entries(windows)) {
    if (id === excludeId || !w.isOpen || w.isMinimized) continue;
    if (!top || (w.z || 0) > (windows[top].z || 0)) top = id;
  }
  return top;
}

function reducer(state, action) {
  const { id } = action;
  switch (action.type) {
    case 'open':
    case 'restore':
    case 'focus': {
      if (action.type === 'focus' && state.activeWindow === id) return state;
      const z = state.zCounter + 1;
      const patch = action.type === 'open' ? { isOpen: true, isMinimized: false }
        : action.type === 'restore' ? { isMinimized: false } : {};
      return {
        zCounter: z,
        activeWindow: id,
        windows: { ...state.windows, [id]: { ...state.windows[id], ...patch, z } },
      };
    }
    case 'close':
    case 'minimize': {
      const patch = action.type === 'close' ? { isOpen: false, isMinimized: false } : { isMinimized: true };
      const windows = { ...state.windows, [id]: { ...state.windows[id], ...patch } };
      return { ...state, windows, activeWindow: topVisible(windows, id) };
    }
    default:
      return state;
  }
}

export function WindowManagerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { windows, zCounter, activeWindow } = state;

  const openWindow = useCallback((id) => dispatch({ type: 'open', id }), []);
  const restoreWindow = useCallback((id) => dispatch({ type: 'restore', id }), []);
  const focusWindow = useCallback((id) => dispatch({ type: 'focus', id }), []);
  const closeWindow = useCallback((id) => dispatch({ type: 'close', id }), []);
  const minimizeWindow = useCallback((id) => dispatch({ type: 'minimize', id }), []);

  const getZIndex = useCallback((id) => windows[id]?.z || BASE_Z, [windows]);
  const isWindowOpen = useCallback((id) => windows[id]?.isOpen ?? false, [windows]);
  const isWindowMinimized = useCallback((id) => windows[id]?.isMinimized ?? false, [windows]);

  const value = useMemo(
    () => ({
      windows,
      activeWindow,
      zCounter,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      focusWindow,
      getZIndex,
      isWindowOpen,
      isWindowMinimized,
    }),
    [windows, activeWindow, zCounter, openWindow, closeWindow, minimizeWindow, restoreWindow, focusWindow, getZIndex, isWindowOpen, isWindowMinimized]
  );

  return <WindowManagerContext.Provider value={value}>{children}</WindowManagerContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
