import { useState, useEffect } from 'react';
import { Timer } from '../models/Timer';
import { Card, Typography, Button, TextField } from '@mui/material';
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
        prevTimers.map((timer) => {
          if (timer.isActive) {
            return {
              ...timer,
              currentSeconds: timer.currentSeconds - 1,
            };
          }
          return timer;
        }),
      );
    }, 1000); // 1000ms = 1s

    return () => clearInterval(interval);
  }, []);

  // toggle play/pause for a timer
  const togglePlay = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isActive: !timer.isActive } : timer,
      ),
    );
  };

  // restart timer to initial time
  const handleRestart = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, currentSeconds: timer.initialSeconds, isActive: false }
          : timer,
      ),
    );
  };

  // add 1 min
  const handleAddMinute = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, currentSeconds: timer.currentSeconds + 60 }
          : timer,
      ),
    );
  };

  // delete timer
  const handleDelete = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
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
      {timers.map((timer) => (
        <TimerCard
          key={timer.id}
          id={timer.id}
          title={timer.title ?? `Timer ${timer.id}`}
          initialSeconds={timer.initialSeconds}
          currentSeconds={timer.currentSeconds}
          isActive={timer.isActive}
          togglePlay={togglePlay}
          onRestart={handleRestart}
          onAddMinute={handleAddMinute}
          onDelete={handleDelete}
        />
      ))}
      <Card sx={{ backgroundColor: 'surfaceTop' }} className="gap-md">
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
