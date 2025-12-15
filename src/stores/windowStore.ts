import { create } from 'zustand';
import { produce } from 'immer';

export type WindowId = 'terminal' | 'finder' | 'contact' | 'about' | 'safari' | 'notes' | 'resume';

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  zIndex: number;
  position: { x: number; y: number };
}

interface WindowStore {
  windows: Record<WindowId, WindowState>;
  maxZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
}

const initialWindows: Record<WindowId, WindowState> = {
  terminal: { id: 'terminal', isOpen: false, zIndex: 100, position: { x: 100, y: 100 } },
  finder: { id: 'finder', isOpen: false, zIndex: 100, position: { x: 150, y: 80 } },
  contact: { id: 'contact', isOpen: false, zIndex: 100, position: { x: 200, y: 120 } },
  about: { id: 'about', isOpen: false, zIndex: 100, position: { x: 250, y: 100 } },
  safari: { id: 'safari', isOpen: false, zIndex: 100, position: { x: 180, y: 90 } },
  notes: { id: 'notes', isOpen: false, zIndex: 100, position: { x: 220, y: 110 } },
  resume: { id: 'resume', isOpen: false, zIndex: 100, position: { x: 200, y: 80 } },
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows,
  maxZIndex: 100,

  openWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.maxZIndex += 1;
        state.windows[id].isOpen = true;
        state.windows[id].zIndex = state.maxZIndex;
      })
    ),

  closeWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.windows[id].isOpen = false;
      })
    ),

  focusWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.maxZIndex += 1;
        state.windows[id].zIndex = state.maxZIndex;
      })
    ),

  updatePosition: (id, position) =>
    set(
      produce((state: WindowStore) => {
        state.windows[id].position = position;
      })
    ),
}));
