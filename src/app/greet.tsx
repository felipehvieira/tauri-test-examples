'use client'
import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'
import { listen } from '@tauri-apps/api/event'

interface LogPayload {
    value: string;
}

interface LogPayloadProps{
    payload: LogPayload
}

export default function Greet(){
    const [count, setCount] = useState(0)
    const [teste, setTeste] = useState(0)
    const [tex, setTex] = useState("a")
    const [cloneStatus, setCloneStatus] = useState('')
    const [streamLog, setStreamLog] = useState('')
    useEffect(()=>{
        invoke<number>('greet', {value: count})
        .then(setTeste)
        .catch(console.error)
        
    })
        useEffect(() =>{
        const logListen = listen("CLONE", (e: LogPayloadProps) => {
            console.log(e.payload.value)
        });
        return () => {
            logListen.then((f) => f())
        };
    },[])
    const handleChange = (event: any) => {
        setTex(event.target.value);
    }

    function cloneRepository(event: any){
        invoke<boolean>('clone_repository', {url: tex})
        .then(changeCloneStatus)
        .catch(console.error)


    }

    function changeCloneStatus(status: boolean){
        if(status)
            setCloneStatus('Clone realizado com sucesso!')
        else
            setCloneStatus('Clone da repositorio falhou')
    }
    

    return (
        <div>
            <input type = "text" id="repository" name="repository" onChange={handleChange}></input><br></br>
            {/* <button onClick = {cloneRepository}>Clone this repository</button><br></br>             */}
            <button onClick = {() => {
                setTimeout(async () =>{
                        const { appWindow } = await import("@tauri-apps/api/window")
                        await invoke("clone_repository", {url: tex, window: appWindow})
                    }, 1000);
            }}
            >Teste Async</button>
            {streamLog}
            {cloneStatus}
        </div>

    )

}