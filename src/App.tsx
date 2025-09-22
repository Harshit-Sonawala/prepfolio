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
      <div className="main-section">
        <h1 className="pd-md">Prepfolio</h1>
        <div className="row align-stretch">
          <div className="sub-section">
            <h3 className="color-sec-1">Tasks</h3>
            <p>Add and remove tasks from your checklist.</p>
            <div className="sub-content">Tasks Content</div>
          </div>
          <div className="spacer-x"></div>
          <div className="sub-section">
            <h3 className="color-sec-2">Pomodoro Timer</h3>
            <p>Timer to manage your tasks and send notifications.</p>
            <div className="sub-content">Timer Content</div>
          </div>
          <div className="spacer-x"></div>
          <div className="sub-section">
            <h3 className="color-sec-3">Persistent Clipboard</h3>
            <p>Click to copy to clipboard. Paste to add it here.</p>
            <div className="sub-content">Clipboard content</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
