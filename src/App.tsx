// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import './App.css';
import TopBar from './components/TopBar';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import { ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from './globalMuiTheme.ts';

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="root">
        <div className="main col gap-md align-stretch">
          <TopBar />
          <div className="row flex-1 gap-md align-stretch">
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
