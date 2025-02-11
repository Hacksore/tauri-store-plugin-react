import { createContext, useEffect, useState } from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import "./App.css";
import { useConfigValue } from "./use-config-value";
import { useAppStore } from "./store";

export const settings = new LazyStore("config.json");
export const SettingContext = createContext(settings);

function AppWrapper() {
  const [view, setView] = useState("testBool");

  return (
    <div className="container p-8" style={{ width: 500 }}>
      <SettingContext.Provider value={settings}>
        <h2 className="text-5xl font-bold pb-2">{view}</h2>
        {view === "testBool" && <View value={"testBool"} />}
        {view === "testBool2" && <View value={"testBool2"} />}

        <div className="flex gap-2">
          <button className="btn btn-neutral w-32" onClick={() => setView("testBool")}>View 1</button>
          <button className="btn btn-neutral w-32" onClick={() => setView("testBool2")}>View 2</button>
        </div>
      </SettingContext.Provider>
    </div>
  );
}

function View({ value }: { value: string }) {
  const { value: testBool } = useConfigValue(value);
  const store = useAppStore();

  useEffect(() => {
    console.log("loading settings...");
    store.loadSettings({ testBool: true, testBool2: false });
  }, []);

  return (
    <div className="container">
      {value}: {testBool ? "true" : "false"}
      <div className="flex gap-2 py-2" >
        <label htmlFor={value}>Demo checkbox</label>
        <input id={value} className="checkbox" type="checkbox" checked={testBool ?? false} onChange={(event => {
          console.log(event.target.checked);
          settings.set(value, event.target.checked);
        })} />
      </div>

      <pre>{JSON.stringify({ settings: store.settings })}</pre>
    </div>
  );
}


export default AppWrapper;
