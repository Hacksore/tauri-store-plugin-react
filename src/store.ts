import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { settings } from "./App";

const DEFAULT_SETTINGS: AppSettings = {
	testBool: false,
	testBool2: false,
};

export interface AppSettings {
	testBool: boolean;
	testBool2: boolean;
}

export type AppSettingsKeys = keyof AppSettings;

type State = {
	settings: AppSettings;
};

type Actions = {
	setSettingValue: <T extends AppSettingsKeys>(
		key: T,
		value: AppSettings[T],
	) => void;
	loadSettings: (config: AppSettings) => void;
};

const getUnseenKeys = (
	mergedSettings: AppSettings,
	currentFields: (keyof AppSettings)[],
): (keyof AppSettings)[] => {
	const unseenKeys = (
		Object.keys(mergedSettings) as (keyof AppSettings)[]
	).filter((key) => !currentFields.includes(key));
	return unseenKeys;
};

export const useAppStore = create<State & Actions>()(
	immer((set) => ({
		settings: DEFAULT_SETTINGS,
		loadSettings: (rawSettings: AppSettings) =>
			set((state) => {
				// handle merging new settings that are the input object
				const currentFields = Object.keys(rawSettings) as AppSettingsKeys[];
				const mergedSettings = { ...DEFAULT_SETTINGS, ...rawSettings };

				// give me the new keys
				const unseenKeys = getUnseenKeys(mergedSettings, currentFields);

				if (unseenKeys.length >= 0) {
					for (const key of unseenKeys) {
						if (currentFields.includes(key)) continue;
						settings.set(key, mergedSettings[key]);
					}

					console.log("saving settings...");
					settings.save();
				}

				state.settings = mergedSettings;

				return state;
			}),
		setSettingValue: (key, val) =>
			set((state) => {
				state.settings[key] = val;

				// NOTE: always perist to tauri but it's not blocking so fire and forget?
				settings.set(key, val);
				// write to disk
				settings.save();

				return state;
			}),
	})),
);
