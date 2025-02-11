import { createContext, useState } from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import "./App.css";
import { useConfigValue } from "./use-config-value";

export const settings = new LazyStore("config.json");
export const SettingContext = createContext(settings);

function AppWrapper() {
  const [view, setView] = useState("testBool");

  return (
    <SettingContext.Provider value={settings}>
      View: {view}
      { view === "testBool" && <View value={"testBool"} /> }
      { view === "testBool2" && <View value={"testBool2"} /> }

      <button onClick={() => setView("testBool")}>View 1</button>
      <button onClick={() => setView("testBool2")}>View 2</button>
    </SettingContext.Provider>
  );
}

function View({ value }: { value: string }) {
  const { value: testBool } = useConfigValue(value);
  return (
    <div className="container p-8">
      {value}: {testBool ? "true" : "false"}
      <div style={{ width: 200 }}>
        <label htmlFor={value}>Test bool</label>
        <input id={value} type="checkbox" checked={testBool ?? false} onChange={(event => {
          console.log(event.target.checked);
          settings.set(value, event.target.checked);
        })} />
      </div>

    </div>
  );
}


export default AppWrapper;
