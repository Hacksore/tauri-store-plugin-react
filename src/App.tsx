import { createContext, useEffect, useState } from "react";
import { LazyStore } from "@tauri-apps/plugin-store";
import "./App.css";
import { useAppStore } from "./store";
import { useSettings } from "./hooks/use-settings";
import { Main } from "./views/main";
import { Secondary } from "./views/secondary";

export const settings = new LazyStore("config.json");
export const SettingContext = createContext(settings);

function App() {
	const [view, setView] = useState("main");
	const store = useAppStore();
	const allSettings = useSettings();
	const [settingsLoaded, setSettingsLoaded] = useState(false);

	useEffect(() => {
		if (!allSettings) return;
		// wait for all the config values to be loaded
		setSettingsLoaded(true);

		console.log("loading settings...", allSettings);
		// load the zustand store
		store.loadSettings(allSettings);

		// NOTE: two second artifical delay
		setTimeout(() => setSettingsLoaded(false), 2_000);
	}, [allSettings, store]);

	if (settingsLoaded)
		return (
			<div className="container loading-wrapper">
				<div className="loading loading-dots loading-lg">Loading...</div>
			</div>
		);

	return (
		<div className="container p-8" style={{ width: 500 }}>
			<SettingContext.Provider value={settings}>
				<div className="flex gap-2 py-10">
					<button
            type="button"
						className="btn btn-neutral w-32"
						onClick={() => setView("main")}
					>
						Main
					</button>
					<button
            type="button"
						className="btn btn-neutral w-32"
						onClick={() => setView("secondary")}
					>
						Seconday
					</button>
				</div>
				<h2 className="text-5xl font-bold pb-2">{view}</h2>
				{view === "main" && <Main />}
				{view === "secondary" && <Secondary />}

				{JSON.stringify(store.settings, null, 2)}
			</SettingContext.Provider>
		</div>
	);
}

export default App;
