import React from 'react';

type Props = {};

const Timer = (props: Props) => {
  return (
    <div className="card">
      <h2 className="color-sec-2">Pomodoro Timer</h2>
      <p>Timer to manage your tasks and send notifications.</p>
      <div className="sub-content">Timer Content</div>
    </div>
  );
};

export default Timer;
