import { useConfigValue } from "../hooks/use-config-value";

export const Main = () => {
  const { value: testBool } = useConfigValue("testBool");

  return (
    <div className="container">
      <div className="flex gap-2 py-2" >
        <label htmlFor="checkbox">Demo checkbox</label>
        <input id="checkbox" className="checkbox" type="checkbox" checked={testBool ?? false} onChange={(event => {
          console.log(event.target.checked);
        })} />
      </div>
    </div>
  );
}
