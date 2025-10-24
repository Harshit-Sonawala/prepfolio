import { Typography, FormControlLabel, Switch } from '@mui/material';

const TopBar = () => {
  return (
    <div className="card bgcolor-surface">
      <div className="row justify-between">
        <Typography variant="h1">Prepfolio</Typography>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Theme: Dark"
        />
      </div>
    </div>
  );
};

export default TopBar;
