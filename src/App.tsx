// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import './App.css';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import { ThemeProvider } from '@mui/material';
import { globalMuiTheme } from './globalMuiTheme.ts';

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <ThemeProvider theme={globalMuiTheme}>
      <div className="root">
        <div className="main column gap-md align-stretch">
          <div className="row justify-between">
            <div className="pd-x-md">
              <h1 className="pd-sm">Prepfolio</h1>
            </div>
            <button>SETTINGS</button>
          </div>

          <div className="row flex-1 gap-md justify-stretch align-stretch">
            <Tasks />
            <Timers />
            <Clipboard />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
