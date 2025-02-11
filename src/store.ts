import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { settings } from './App'

type State = {
  settings: Record<string, unknown>
}

type Actions = {
  setSettingValue: (key: string, value: any) => void
  loadSettings: (config: any) => void
}

export const useAppStore = create<State & Actions>()(
  immer((set) => ({
    settings: {},
    loadSettings: (settings: any) => set((state) => {
      state.settings = settings;

      return state;
    }),
    setSettingValue: (key, val) => set((state) => {
      state.settings[key] = val;

      // always perist to tauri but it's not blocking
      settings.set(key, val);

      return state;
    })
  })))

