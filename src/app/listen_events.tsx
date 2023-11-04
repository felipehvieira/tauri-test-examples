import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

interface LogPayload {
    value: string;
}

interface LogPayloadProps{
    payload: LogPayload
}

export default function ListenEvents(){
    const [tex, setTex] = useState("a")
    const [streamLog, setStreamLog] = useState('')
  
  
    useEffect (() => {
      listen("CLONE", (e: LogPayloadProps) => {
        setStreamLog(e.payload.value)
      });
    })
    
  
  const handleChange = (event: any) => {
      setTex(event.target.value);
  }
  return(
    <div>
        <input type = "text" id="repository" name="repository" onChange={handleChange}></input><br></br>
        {/* <button onClick = {cloneRepository}>Clone this repository</button><br></br>             */}
        <button onClick = {() => {
        invoke("clone_repository", {url: tex})
        }}
        >Test Listen Event Function</button><br></br>
        {streamLog}<br></br>
        {tex}
    </div>
  )
}