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

      <input type="text" />
      <input type="checkbox" checked />

      {testBool ? "true" : "false"}

    </main>
  );
}

export default AppWrapper;
