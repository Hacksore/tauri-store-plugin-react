import { useEffect, useState } from "react";
import { settings } from "../App";
import { type AppSettingsKeys, useAppStore, type AppSettings } from "../store";
import { listen } from "@tauri-apps/api/event";

interface StoreUpdatePayload {
  path: string;
  resourceId: number;
  key: string;
  value: any;
  exists: boolean;
}

export const useSettings = () => {
  const store = useAppStore();
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

    // listen for backend changes
    const fn = listen<StoreUpdatePayload>("store://change", (event) => {
      console.log(event.payload.key);
      // TODO: fix types here
      // @ts-ignore
      store.setSettingValue(event.payload.key, event.payload.value, true);
    });

    return () => {
      fn.then((unsub) => unsub());
    };
  }, []);

  return initialSettings;
};
