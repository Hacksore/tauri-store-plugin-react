import { useAppStore } from "../store";

export const Main = () => {
	const store = useAppStore();
	const testBool = store.settings.testBool;
	const testBool2 = store.settings.testBool2;

	return (
		<div className="container py-4">
			<div className="flex gap-2">
				<label htmlFor="testBool">testBool</label>
				<input
					id="testBool"
					className="checkbox"
					type="checkbox"
					checked={testBool}
					onChange={(event) => {
						store.setSettingValue("testBool", event.target.checked);
					}}
				/>

				<label htmlFor="testBool2">testBool2</label>
				<input
					id="testBool2"
					className="checkbox"
					type="checkbox"
					checked={testBool2}
					onChange={(event) => {
						store.setSettingValue("testBool2", event.target.checked);
					}}
				/>
			</div>
		</div>
	);
};
