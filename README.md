# tauri-store-plugin-react 

This is mainly to figure out how overlayed will handle the app settings with the [tauri store plugin](https://v2.tauri.app/plugin/store) and [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) but you can probably learn from this MVP.


### How it works
- On app load sync the `@tauri-apps/plugin-store` -> `zustand`
- Reads will access the value from `zustand` as the single source of truth
- Front end (react) writes will use zustand actions and we can call the `@tauri-apps/plugin-store` to update/save the new value
- Backend (tauri) writes will dispatch a `store://change` event and we will update `zustand` store

### Goals / TODO

- [x] Full typescript support
- [x] Handle new config keys getting merged in
- [ ] Handle rust setting a value and the `zustand` store should update

### Demo

https://github.com/user-attachments/assets/2b6b4945-1180-4f91-a6e1-7349f651169d
