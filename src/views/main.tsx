import { useAppStore } from "../store";

export const Main = () => {
  const store = useAppStore();
  const testBool = store.settings["testBool"] || false;

  return (
    <div className="container">
      <div className="flex gap-2 py-2" >
        <label htmlFor="checkbox">Demo checkbox</label>
        <input id="checkbox" className="checkbox" type="checkbox" checked={testBool} onChange={(event => {
          console.log(event.target.checked);
          store.setSettingValue("testBool", event.target.checked)
        })} />
      </div>
    </div>
  );
}
