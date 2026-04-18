import { useState, useEffect } from 'react';
import { Timer } from '../models/Timer';
import { Card, Typography, Button, TextField, Divider } from '@mui/material';
import { AddRounded } from '@mui/icons-material';
import { load } from '@tauri-apps/plugin-store';

import TimerCard from './TimerCard';

function Timers() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimerTitle, setNewTimerTitle] = useState<string>('');
  const [newTimerHH, setNewTimerHH] = useState<number>(0);
  const [newTimerMM, setNewTimerMM] = useState<number>(0);
  const [newTimerSS, setNewTimerSS] = useState<number>(0);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  // countdown logic runs every second and updates all active timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((eachTimer) => {
          if (eachTimer.isActive) {
            return {
              ...eachTimer,
              currentSeconds: eachTimer.currentSeconds - 1,
            };
          }
          return eachTimer;
        }),
      );
    }, 1000); // 1000ms = 1s

    return () => clearInterval(interval);
  }, []);

  // toggle play/pause for a timer
  const toggleTimerPlay = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((eachTimer) =>
        eachTimer.id === id ? { ...eachTimer, isActive: !eachTimer.isActive } : eachTimer,
      ),
    );
  };

  // restart timer to initial time
  const restartTimer = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((eachTimer) =>
        eachTimer.id === id
          ? { ...eachTimer, currentSeconds: eachTimer.initialSeconds, isActive: false }
          : eachTimer,
      ),
    );
  };

  // add 1 min
  const addMinuteToTimer = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((eachTimer) =>
        eachTimer.id === id
          ? { ...eachTimer, currentSeconds: eachTimer.currentSeconds + 60 }
          : eachTimer,
      ),
    );
  };

  // delete timer
  const deleteTimer = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((eachTimer) => eachTimer.id !== id));
  };

  // add a new timer through textfields
  const addNewTimer = () => {
    const timestamp = Date.now();
    const trimmedNewTitle = newTimerTitle.trim();
    const HH = Number.isNaN(newTimerHH) ? 0 : newTimerHH;
    const MM = Number.isNaN(newTimerMM) ? 0 : newTimerMM;
    const SS = Number.isNaN(newTimerSS) ? 0 : newTimerSS;
    const totalSeconds = HH * 3600 + MM * 60 + SS;
    const newTimer: Timer = {
      id: timestamp,
      title:
        trimmedNewTitle !== '' ? trimmedNewTitle : `${HH}:${MM}:${SS} Timer`,
      initialSeconds: totalSeconds,
      currentSeconds: totalSeconds,
      isActive: false,
    };
    setTimers([...timers, newTimer]);
    setNewTimerTitle('');
    setNewTimerHH(0);
    setNewTimerMM(0);
    setNewTimerSS(0);
  };

  // load timers from file on mount
  useEffect(() => {
    const loadTimers = async () => {
      const fileStore = await load('timers.json');
      const allTimers = await fileStore.get<Timer[]>('allTimers');
      if (allTimers) {
        setTimers(allTimers);
      }
      setIsFileLoaded(true); // mark file loaded
      console.log('Loaded Timers');
    };
    loadTimers();
  }, []);

  // save timers when changed and only after isFileLoaded
  useEffect(() => {
    if (!isFileLoaded) return;

    const saveTimers = async () => {
      const fileStore = await load('timers.json');
      await fileStore.set('allTimers', timers);
      await fileStore.save();
      console.log('Saved Timers');
    };
    saveTimers();
  }, [timers, isFileLoaded]);

  return (
    <Card className="flex-1 gap-md">
      <Typography variant="h2" color="secondary2">
        Timers
      </Typography>
      <Typography variant="body1">
        Set timers to manage your tasks and send notifications.
      </Typography>
      {timers.map((eachTimer) => (
        <TimerCard
          key={eachTimer.id}
          id={eachTimer.id}
          title={eachTimer.title ?? `Timer ${eachTimer.id}`}
          initialSeconds={eachTimer.initialSeconds}
          currentSeconds={eachTimer.currentSeconds}
          isActive={eachTimer.isActive}
          togglePlay={toggleTimerPlay}
          onRestart={restartTimer}
          onAddMinute={addMinuteToTimer}
          onDelete={deleteTimer}
        />
      ))}
      <Divider sx={{ margin: '0.5rem' }} />
      <Card sx={{ backgroundColor: 'surfaceTop' }} className="gap-md">
        <Typography variant="h3" className="pd-sm">
          Set New Timer
        </Typography>
        <TextField
          type="text"
          variant="filled"
          name="newTimerTitle"
          label={'New Timer Title'}
          value={newTimerTitle}
          onChange={(e) => setNewTimerTitle(e.target.value)}
        />
        <div className="row justify-stretch gap-sm">
          <TextField
            type="number"
            variant="filled"
            name="newTimerHH"
            label={'HH'}
            value={newTimerHH}
            onChange={(e) => {
              const val = e.target.value;
              if (Number(val) >= 0 && Number(val) <= 99 && val.length <= 2) {
                setNewTimerHH(Number(e.target.value));
              }
            }}
            slotProps={{
              htmlInput: { maxLength: 2, pattern: '[0-9]*', min: 0, max: 99 },
            }}
            className="flex-1"
          />
          <Typography variant="h1" color="textPrimary">
            :
          </Typography>
          <TextField
            type="number"
            variant="filled"
            name="newTimerMM"
            label={'MM'}
            value={newTimerMM}
            onChange={(e) => {
              const val = e.target.value;
              if (Number(val) >= 0 && Number(val) <= 59 && val.length <= 2) {
                setNewTimerMM(Number(e.target.value));
              }
            }}
            slotProps={{
              htmlInput: { maxLength: 2, pattern: '[0-9]*', min: 0, max: 59 },
            }}
            className="flex-1"
          />
          <Typography variant="h1" color="textPrimary">
            :
          </Typography>
          <TextField
            type="number"
            variant="filled"
            name="newTimerSS"
            label={'SS'}
            value={newTimerSS}
            onChange={(e) => {
              const val = e.target.value;
              if (Number(val) >= 0 && Number(val) <= 59 && val.length <= 2) {
                setNewTimerSS(Number(e.target.value));
              }
            }}
            slotProps={{
              htmlInput: { maxLength: 2, pattern: '[0-9]*', min: 0, max: 59 },
            }}
            className="flex-1"
          />
        </div>
        <Button
          variant="contained"
          startIcon={<AddRounded />}
          disabled={newTimerHH === 0 && newTimerMM === 0 && newTimerSS === 0}
          onClick={addNewTimer}
          sx={{
            height: '3rem',
            borderRadius: '10px',
          }}
        >
          Set New Timer
        </Button>
      </Card>
    </Card>
  );
}

export default Timers;
