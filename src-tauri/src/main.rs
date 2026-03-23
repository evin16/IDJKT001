// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod models;  
mod pdf;    

use models::FormPayload;

#[tauri::command]
fn ping() -> String {
    "pong".to_string()
}

#[tauri::command]
fn generate_pdf(payload: FormPayload) -> Result<String, String> {
    println!("[generate_pdf] Menerima: {:?}", payload);

    pdf::buat_pdf(payload)
        .map_err(|e| e.to_string())
}

//  Entry point — Mulai aplikasi Tauri
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            ping,
            generate_pdf,
        ])
        .run(tauri::generate_context!())
        .expect("Error saat menjalankan aplikasi Tauri")
}