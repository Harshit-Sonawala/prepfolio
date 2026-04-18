import { useState, useEffect } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { load } from '@tauri-apps/plugin-store';

function Clipboard() {
  const [clipboard, setClipboard] = useState<string[]>([
    'https://hss-portfolio-flax.vercel.app/',
    'https://mui.com/material-ui/material-icons/',
    'https://v2.tauri.app/',
  ]);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  // load clipboard from file on mount
  useEffect(() => {
    const loadClipboard = async () => {
      const fileStore = await load('clipboard.json');
      const allClips = await fileStore.get<string[]>('allClips');
      if (allClips) {
        setClipboard(allClips);
      }
      setIsFileLoaded(true); // mark file loaded
      console.log('Loaded Clipboard');
    };
    loadClipboard();
  }, []);

  // save clipboard whenever they change & only after isFileLoaded
  useEffect(() => {
    if (!isFileLoaded) return;

    const saveClipboard = async () => {
      const fileStore = await load('clipboard.json');
      await fileStore.set('allClips', clipboard);
      await fileStore.save();
      console.log('Saved Clipboard');
    };
    saveClipboard();
  }, [clipboard, isFileLoaded]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  return (
    <Card className="flex-1 gap-md">
      <Typography variant="h2" color="secondary3">
        Clipboard
      </Typography>
      <Typography variant="body1">
        Click to copy to clipboard. Paste to add it here.
      </Typography>
      {clipboard.map((clipItem: string, index: number) => (
        <Box 
          key={index} 
          className="card"
          onClick={() => copyToClipboard(clipItem)}
          sx={{ 
            bgcolor: 'surfaceTop',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease, transform 0.1s ease',
            '&:hover': {
              bgcolor: 'surfaceBright',
            },
            '&:active': {
              bgcolor: 'secondary3',
              color: 'background.paper',
              transform: 'scale(0.98)',
            }
          }}
        >
          <Typography sx={{ color: 'inherit' }}>{clipItem}</Typography>
        </Box>
      ))}

    </Card>
  );
}

export default Clipboard;
