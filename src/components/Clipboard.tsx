import { Typography } from '@mui/material';

const Clipboard = () => {
  return (
    <div className="card bgcolor-surface">
      <Typography variant="h2" color="secondaryColor3">
        Clipboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        Click to copy to clipboard. Paste to add it here.
      </Typography>
      <div className="flex-1">
        <div className="card bgcolor-surface-top">
          <Typography>Pasted Item 1</Typography>
        </div>
      </div>
    </div>
  );
};

export default Clipboard;
