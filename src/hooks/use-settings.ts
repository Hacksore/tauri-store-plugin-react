import { useEffect, useState } from "react";
import { settings } from "../App";
import type { AppSettings } from "../store";

export const useSettings = () => {
	const [initialSettings, setInitialSettings] = useState<AppSettings | null>(
		null,
	);

	useEffect(() => {
		const loadSettings = async () => {
			try {
				const keys = await settings.keys();
				const loadedSettings: Partial<AppSettings> = {};

				for (const key of keys) {
					try {
						const value = await settings.get(key);

						// Type assertion to handle potential type mismatches.  Important!
						loadedSettings[key as keyof AppSettings] =
							value as AppSettings[keyof AppSettings];
					} catch (error) {
						console.error(`Error loading setting for key ${key}:`, error);
					}
				}

				setInitialSettings(loadedSettings as AppSettings); // Cast to AppSettings
			} catch (error) {
				console.error("Error loading settings keys:", error);
			}
		};

		loadSettings();
	}, []);

	return initialSettings;
};
