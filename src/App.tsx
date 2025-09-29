// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import './App.css';
import Tasks from './components/Tasks';
import Timer from './components/Timer';
import Clipboard from './components/Clipboard';

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
          <Tasks />
          <Timer />
          <Clipboard />
        </div>
      </div>
    </div>
  );
}

export default App;
