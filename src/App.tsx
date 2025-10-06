// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import './App.css';
import Tasks from './components/Tasks';
import Timers from './components/Timers';
import Clipboard from './components/Clipboard';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {
  // const [greetMsg, setGreetMsg] = useState("");
  // const [name, setName] = useState("");

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: {
            main: '#60daff',
          },
          secondary: {
            main: '#0bddb0',
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiPaper: {
            defaultProps: {
              elevation: 0, // All Paper components default to 0
            },
          },
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 20, // Pill-shaped buttons
                backgroundColor: '#3d3d3d',
                color: '#f4f4f4',
                '&:hover': {
                  backgroundColor: '#60daff',
                },
              },
              startIcon: {
                color: '#60daff',
              },
              endIcon: {
                color: '#60daff',
              },
            },
          },
        },
      })}
    >
      <div className="root">
        <div className="main column gap-sm align-stretch">
          <div className="row justify-between">
            <div className="pd-x-md">
              <h1 className="pd-sm">Prepfolio</h1>
            </div>
            <button>SETTINGS</button>
          </div>

          <div className="row flex-1 gap-sm justify-stretch align-stretch">
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
