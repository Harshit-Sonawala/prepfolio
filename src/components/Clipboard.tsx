import { useState } from 'react';
import { Card, Typography } from '@mui/material';

function Clipboard() {
  const [clipboard, setClipboard] = useState<string[]>([
    'https://hss-portfolio-flax.vercel.app/',
    'https://mui.com/material-ui/material-icons/',
    'https://v2.tauri.app/',
  ]);
  return (
    <Card className="flex-1 gap-md">
      <Typography variant="h2" color="secondary3">
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
    </Card>
  );
}

export default Clipboard;
