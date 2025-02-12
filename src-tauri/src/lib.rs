use rand::Rng;
use tauri::{generate_handler, Manager, WebviewWindow};
use tauri_plugin_store::StoreExt;

#[tauri::command]
fn test_command(window: WebviewWindow) {
  let app = window.app_handle();
  // TODO: we should be able to hoist this in the app global state but need to figure that out
  let store = app.store("config.json").unwrap();
  let mut rng = rand::thread_rng();
  let n1: u16 = rng.gen();

  println!("Setting the state value to something random: {n1}");

  store.set("random_value", n1);
  _ = store.save();
}

// struct AppState {
//   store: Store,
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(move |app| {
      let store = app.store("config.json")?;
      // let app_state = AppState { store };

      // TODO: figure out how to manage the config so we can use it else where like the command
      // handler above so we don't have more than one instance loaded
      // app.manage(app_state); // manage this store value in an arc/mutex

      println!("Hello, world!, store: {:?}", store.keys());

      Ok(())
    })
    .invoke_handler(generate_handler![test_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
