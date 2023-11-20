import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { Command } from "@tauri-apps/api/shell";
import { useEffect, useState } from "react";
import { event } from "@tauri-apps/api";

interface LogPayload {
    value: string;
}

interface LogPayloadProps{
    payload: LogPayload
}
async function testea(){
  
}
export default function ListenEvents(){
    const [tex, setTex] = useState("a")
    const [streamLog, setStreamLog] = useState('')
    const command = new Command('run-ping', ['status'])
    command.on('error', error => console.error(`command error: "${error}"`));
    command.stdout.on('data', line => console.log(`command stdout: "${line}"`));
    command.stderr.on('data', line => console.log(`command stderr: "${line}"`));
  
  
    useEffect (() => {
      listen("CLONE", (e: LogPayloadProps) => {
        setStreamLog(e.payload.value)
      });
    })

  useEffect (() =>{
    command.stdout.on('data', line => setTex(line))
    command.stderr.on('data', line => setTex(line))
  })
  
  const handleChange = (event: any) => {
      setTex(event.target.value);
  }
  return(
    <div>
        <input type = "text" id="repository" name="repository" onChange={handleChange}></input><br></br>
        {/* <button onClick = {cloneRepository}>Clone this repository</button><br></br>             */}
        <button onClick = {async () => {
          (await command.execute()).stdout
        }}
        >Test Listen Event Function</button><br></br>
        {streamLog}<br></br>
        {tex}
    </div>
  )
}