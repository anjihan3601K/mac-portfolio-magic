import { create } from 'zustand';
import { produce } from 'immer';

export type WindowId = 'terminal' | 'finder' | 'contact' | 'about' | 'safari' | 'notes' | 'resume' | 'achievements' | 'gallery';

interface WindowState {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  prevPosition?: { x: number; y: number };
}

interface WindowStore {
  windows: Record<WindowId, WindowState>;
  maxZIndex: number;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
}

const createWindow = (id: WindowId, x: number, y: number): WindowState => ({
  id, isOpen: false, isMinimized: false, isMaximized: false, zIndex: 100, position: { x, y },
});

const initialWindows: Record<WindowId, WindowState> = {
  terminal: createWindow('terminal', 100, 100),
  finder: createWindow('finder', 150, 80),
  contact: createWindow('contact', 200, 120),
  about: createWindow('about', 250, 100),
  safari: createWindow('safari', 180, 90),
  notes: createWindow('notes', 220, 110),
  resume: createWindow('resume', 200, 80),
  achievements: createWindow('achievements', 180, 100),
  gallery: createWindow('gallery', 160, 90),
};

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows,
  maxZIndex: 100,

  openWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.maxZIndex += 1;
        state.windows[id].isOpen = true;
        state.windows[id].isMinimized = false;
        state.windows[id].zIndex = state.maxZIndex;
      })
    ),

  closeWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.windows[id].isOpen = false;
        state.windows[id].isMinimized = false;
        state.windows[id].isMaximized = false;
      })
    ),

  focusWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.maxZIndex += 1;
        state.windows[id].zIndex = state.maxZIndex;
      })
    ),

  minimizeWindow: (id) =>
    set(
      produce((state: WindowStore) => {
        state.windows[id].isMinimized = true;
      })
    ),

  toggleMaximize: (id) =>
    set(
      produce((state: WindowStore) => {
        const win = state.windows[id];
        if (win.isMaximized) {
          win.isMaximized = false;
          if (win.prevPosition) {
            win.position = win.prevPosition;
          }
        } else {
          win.prevPosition = { ...win.position };
          win.isMaximized = true;
          win.position = { x: 0, y: 28 }; // below menu bar
        }
        state.maxZIndex += 1;
        win.zIndex = state.maxZIndex;
      })
    ),

  updatePosition: (id, position) =>
    set(
      produce((state: WindowStore) => {
        state.windows[id].position = position;
      })
    ),
}));
