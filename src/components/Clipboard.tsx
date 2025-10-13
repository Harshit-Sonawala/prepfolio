import { useState } from 'react';
import { Typography } from '@mui/material';

const Clipboard = () => {
  const [clipboard, setClipboard] = useState<string[]>([
    'https://hss-portfolio-flax.vercel.app/',
    'https://mui.com/material-ui/material-icons/',
    'https://v2.tauri.app/',
  ]);
  return (
    <div className="card bgcolor-surface gap-md">
      <Typography variant="h2" color="secondaryColor3">
        Clipboard
      </Typography>
      <Typography variant="body1">
        Click to copy to clipboard. Paste to add it here.
      </Typography>
      {clipboard.map((clipItem: string) => (
        <div className="card bgcolor-surface-top">
          <Typography>{clipItem}</Typography>
        </div>
      ))}
    </div>
  );
};

export default Clipboard;
