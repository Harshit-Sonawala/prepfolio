import { useState, useEffect } from 'react';
import { Timer } from '../models/Timer';
import { load } from '@tauri-apps/plugin-store';

import TimerCard from './TimerCard';

const Timers = () => {
  const [timers, setTimers] = useState<Timer[]>([
    { id: 0, title: 'Timer 1', seconds: 120, isActive: false },
    { id: 1, title: 'Timer 2', seconds: 180, isActive: false },
    { id: 2, title: 'Timer 3', seconds: 240, isActive: true },
  ]);
  const [newTimerTitle, setNewTimerTitle] = useState<string>('');
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

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
    <div className="card gap-sm">
      <h2 className="color-sec-2">Timers</h2>
      <p>Set timers to manage your tasks and send notifications.</p>

      {timers.map((eachTimer) => (
        <TimerCard
          key={eachTimer.id}
          id={eachTimer.id}
          title={eachTimer.title ?? `Timer ${eachTimer.id}`}
          seconds={eachTimer.seconds}
          isActive={eachTimer.isActive}
          togglePlay={() => {}}
          onRestart={() => {}}
          onDelete={() => {}}
        />
      ))}
    </div>
  );
};

export default Timers;
