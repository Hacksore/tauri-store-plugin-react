import { createContext } from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import "./App.css";
import { useConfigValue } from "./use-config-value";

export const settings = new LazyStore("config.json");

export const SettingContext = createContext(settings);


function AppWrapper() {
  return (
    <SettingContext.Provider value={settings}>
      <App />
    </SettingContext.Provider>
  );
}

function App() {
  const { value: testBool } = useConfigValue("testBool");
  return (
    <main className="container">
      <h1>Testing settings</h1>

      Test bool value: {testBool ? "true" : "false"}
      <div style={{ width: 200 }}>
        <label htmlFor="testBool">Test bool</label>
        <input id="testBool" type="checkbox" checked={testBool ?? false} onChange={(event => {
          console.log(event.target.checked);
          settings.set("testBool", event.target.checked);
        })} />
      </div>

    </main>
  );
}

export default AppWrapper;
