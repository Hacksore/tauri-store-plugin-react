import { useEffect, useState } from "react";
import { settings } from "../App";

export const useSettings = () => {
  // NOTE: not sure if we need this
  const [initialSettings, setInitialSettings] = useState<any | null>(null);
  useEffect(() => {
    settings.keys().then(s => {
      const promises = s.map(async key => {
        const value = await settings.get(key);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore fix later
        setInitialSettings(prev => ({ ...prev, [key]: value }));
      });
      Promise.all(promises);
    });
  }, []);
  return initialSettings;
};
