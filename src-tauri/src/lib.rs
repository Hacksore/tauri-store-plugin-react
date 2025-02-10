use tauri_plugin_store::StoreExt;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(move |app| {

      let store = app.store("config.json")?;

      println!("Hello, world!, store: {:?}", store.keys());

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
