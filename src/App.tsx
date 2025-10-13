// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import './App.css';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import {
  ThemeProvider,
  Typography,
  FormControlLabel,
  Switch,
} from '@mui/material';
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
          <div className="card bgcolor-surface">
            <div className="row justify-between">
              <Typography variant="h1">Prepfolio</Typography>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Theme: Dark"
              />
            </div>
          </div>
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
