import { listen } from "@tauri-apps/api/event";
import { useContext, useEffect, useState } from "react";
import { SettingContext } from "../App";

// TODO: make this more better
// right now it fetch teh value every time for the store which will cause flickering in state while it loads
// what are other ways to handle this???
export const useConfigValue = (
  key: string
): {
  value: any
} => {
  const store = useContext(SettingContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    // TODO: fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
