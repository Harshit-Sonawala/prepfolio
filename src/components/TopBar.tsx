import { useState, useEffect } from 'react';
import { Card, Typography, FormControlLabel, Switch } from '@mui/material';

type TopBarProps = {
  isDarkMode: boolean;
  onThemeToggle: (checked: boolean) => void;
};

function TopBar(props: TopBarProps) {
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
    <Card
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className="row justify-between align-center"
    >
      <Typography variant="h1" className="pd-md">
        Prepfolio
      </Typography>
      <Card>
        <Typography variant="h3">{formattedDateTime}</Typography>
      </Card>
      <FormControlLabel
        control={
          <Switch
            checked={props.isDarkMode}
            onChange={(e) => props.onThemeToggle(e.target.checked)}
          />
        }
        label={props.isDarkMode ? 'Theme: Dark' : 'Theme: Light'}
      />
    </Card>
    // </div>
  );
}

export default TopBar;
