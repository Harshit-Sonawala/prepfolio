import { useState, useEffect } from 'react';
import { Timer } from '../models/Timer';
import { Typography } from '@mui/material';
import { load } from '@tauri-apps/plugin-store';

import TimerCard from './TimerCard';

const Timers = () => {
  const [timers, setTimers] = useState<Timer[]>([
    {
      id: 0,
      title: 'Timer 1',
      initialSeconds: 120,
      currentSeconds: 120,
      isActive: false,
    },
    {
      id: 1,
      title: 'Timer 2',
      initialSeconds: 15,
      currentSeconds: 15,
      isActive: false,
    },
    {
      id: 2,
      title: 'Timer 3',
      initialSeconds: 7234,
      currentSeconds: 7234,
      isActive: false,
    },
  ]);
  const [newTimerTitle, setNewTimerTitle] = useState<string>('');
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
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Toggle play/pause for a timer
  const togglePlay = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id ? { ...timer, isActive: !timer.isActive } : timer
      )
    );
  };

  // Restart timer to initial time
  const handleRestart = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, currentSeconds: timer.initialSeconds, isActive: false }
          : timer
      )
    );
  };

  // Add 1 min
  const handleAddMinute = (id: number) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) =>
        timer.id === id
          ? { ...timer, currentSeconds: timer.currentSeconds + 60 }
          : timer
      )
    );
  };

  // Delete timer
  const handleDelete = (id: number) => {
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.id !== id));
  };

  // // load timers from file on mount
  // useEffect(() => {
  //   const loadTimers = async () => {
  //     const fileStore = await load('timers.json');
  //     const allTimers = await fileStore.get<Timer[]>('allTimers');
  //     if (allTimers) {
  //       setTimers(allTimers);
  //     }
  //     setIsFileLoaded(true); // mark file loaded
  //     console.log('Loaded Timers');
  //   };
  //   loadTimers();
  // }, []);

  // // save timers when changed and onl after isFileLoaded
  // useEffect(() => {
  //   if (!isFileLoaded) return;

  //   const saveTimers = async () => {
  //     const fileStore = await load('timers.json');
  //     await fileStore.set('allTimers', timers);
  //     await fileStore.save();
  //     console.log('Saved Timers');
  //   };
  //   saveTimers();
  // }, [timers, isFileLoaded]);

  return (
    <div className="card bgcolor-surface gap-sm">
      <Typography variant="h2" color="secondaryColor2">
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
    </div>
  );
};

export default Timers;
