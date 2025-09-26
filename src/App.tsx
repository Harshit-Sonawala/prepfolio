// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <div className="root">
      <div className="main column gap-sm align-stretch">
        <div className="row justify-between">
          <h1 className="pd-md">Prepfolio</h1>
          <button>SETTINGS</button>
        </div>

        <div className="row flex-1 gap-md justify-stretch align-stretch">
          
          
          <div className="card">
            <h3 className="color-sec-2 pd-y-md">Pomodoro Timer</h3>
            <p className="pd-md">Timer to manage your tasks and send notifications.</p>
            <div className="sub-content">Timer Content</div>
          </div>
          
          <div className="card">
            <h3 className="color-sec-3 pd-y-md">Persistent Clipboard</h3>
            <p className="pd-md">Click to copy to clipboard. Paste to add it here.</p>
            <div className="sub-content">Clipboard content</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
