import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { settings } from './App'

const DEFAULT_SETTINGS = {
  testBool: false,
  testBool2: false,
}

export interface AppSettings {
  testBool: boolean;
  testBool2: boolean;
}

export type AppSettingsKeys = keyof AppSettings;

type State = {
  settings: AppSettings;
}

type Actions = {
  setSettingValue: <T extends AppSettingsKeys>(key: T, value: AppSettings[T]) => void;
  loadSettings: (config: any) => void
}

export const useAppStore = create<State & Actions>()(
  immer((set) => ({
    settings: DEFAULT_SETTINGS,
    loadSettings: (settings: any) => set((state) => {
      state.settings = settings;

      return state;
    }),
    setSettingValue: (key, val) => set((state) => {
      state.settings[key] = val;

      // NOTE: always perist to tauri but it's not blocking so fire and forget?
      settings.set(key, val);
      // write to disk
      settings.save();

      return state;
    })
  })))

