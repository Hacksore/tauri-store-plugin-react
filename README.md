# tauri-store-plugin-react 

Goal is to figure out how to make the plugin for store work really nicely with react. 

This is mainly to figure out how overlayed will handle the app settings.

https://v2.tauri.app/plugin/store/

### How it works
- On app load sync the `@tauri-apps/plugin-store` -> `zustand`
- Reads will access the value from `zustand` as the single source of truth
- Writes will use zustand actions and we can call the `@tauri-apps/plugin-store` to update/save the new value

### Goals / TODO

- [ ] Full typescript support
- [ ] Handle new config keys getting merged in
