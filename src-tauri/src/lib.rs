use rand::Rng;
use tauri::{generate_handler, Manager, WebviewWindow};
use tauri_plugin_store::StoreExt;

const CONFIG_FILE: &str = "config.json";

#[tauri::command]
fn test_command(window: WebviewWindow) {
  let app = window.app_handle();
  let store = app.store(CONFIG_FILE).unwrap();
  let mut rng = rand::rng();
  let n1: u16 = rng.random();

  println!("Setting the state value to something random: {n1}");

  store.set("randomNumber", n1);
  _ = store.save();
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_opener::init())
    .plugin(tauri_plugin_store::Builder::default().build())
    .setup(move |app| {
      let store = app.store(CONFIG_FILE)?;
      let boolean_value = store.get("testBool").and_then(|v| v.as_bool()).unwrap();

      println!("Store bool: {:?}", boolean_value);
      println!("Store keys: {:?}", store.entries());

      Ok(())
    })
    .invoke_handler(generate_handler![test_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
