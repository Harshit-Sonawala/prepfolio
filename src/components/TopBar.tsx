import { useState, useEffect } from 'react';
import { Typography, FormControlLabel, Switch } from '@mui/material';

function TopBar() {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    // year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="card bgcolor-surface">
      <div className="row justify-between">
        <Typography variant="h1">Prepfolio</Typography>
        <Typography variant="h3">{formattedDateTime}</Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Theme: Dark"
        />
      </div>
    </div>
  );
}

export default TopBar;
