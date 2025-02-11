import { listen } from "@tauri-apps/api/event";
import { useContext, useEffect, useState } from "react";
import { SettingContext } from "../App";

export const useConfigValue = (
  key: string
): {
  value: any
} => {
  const store = useContext(SettingContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    store.get<any>(key).then(val => {
      setValue(val);
    });

    // handle updates
    const listenFn = listen<any>("store://change", event => {
      if (event.payload.key !== key) return;
      setValue(event.payload.value);
    });

    return () => {
      listenFn.then(fn => fn()); // remove the listener
    };
  }, []);

  return { value };
};
