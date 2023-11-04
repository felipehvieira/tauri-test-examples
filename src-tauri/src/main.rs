// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::{process::{Command, Stdio}, io::{BufReader, BufRead}};

use tauri::{Manager, AppHandle};


#[derive(Clone, serde::Serialize)]
struct Payload {
  value: String
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![clone_repository])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}


#[tauri::command]
async fn clone_repository(_url: &str, app: AppHandle) -> Result<(),()>{
  //let mut value: String;
  let mut cmd_output =  Command::new("ping")
    .args(["-t","8.8.8.8"])
    .stdout(Stdio::piped())
    .spawn()
    .unwrap();
 {
    let stdout = cmd_output.stdout.as_mut().unwrap();
    let mut stdout_reader = BufReader::new(stdout);
  
  
    // stdoutReader
    //   .lines()
    //   .filter_map(|line| line.ok())
    //   .for_each(|line| window.emit("CLONE", Payload { value: line }).unwrap());
  
  
    //let lines = stdoutReader.lines();
    let mut buf = String::new();
    while let Ok(n) = stdout_reader.read_line(&mut buf){
      if n > 0 {
        let value = buf.to_string();  
        app.app_handle().emit_all("CLONE",Payload { value }).unwrap();
        buf.clear();
      } else {
        break;
      }
    }
    // for line in lines{
    //   value = String::from_utf8_lossy(&line);
    //   window.emit("CLONE", "a").unwrap();
    
    // }
  }
  cmd_output.wait().unwrap();
  return Result::Ok(())

  // while let Ok(n) = stdoutReader.read_line(&mut buf){
  //   if (n > 0) {
  //     print!("teste {}", buf);
  //     window.emit("CLONE",buf.trim()).unwrap();
  //     buf.clear()
  //   } else {
  //     break;
  //   }
  // }
}
