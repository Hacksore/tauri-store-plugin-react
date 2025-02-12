import { useEffect, useState } from "react";
import { settings } from "../App";

export const useSettings = () => {
  const [initialSettings, setInitialSettings] = useState<any | null>(null);
  useEffect(() => {
    settings.keys().then(s => {
      const promises = s.map(async key => {
        const value = await settings.get(key);
        setInitialSettings(prev => ({ ...prev, [key]: value }));
      });
      Promise.all(promises);
    });
  }, []);
  return initialSettings;
};
