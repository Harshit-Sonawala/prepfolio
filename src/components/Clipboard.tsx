import { useState, useEffect } from 'react';
import { load } from '@tauri-apps/plugin-store';
import { Card, Typography, Box, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

function Clipboard() {
  const [clipboard, setClipboard] = useState<string[]>([]);
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  // Global paste listener
  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const pastedText = event.clipboardData?.getData('text');
      if (pastedText && pastedText.trim() !== '') {
        setClipboard((prevClips) => [...prevClips, pastedText.trim()]);
        console.log('Added clip from paste:', pastedText.trim());
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

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

  const deleteClip = (index: number) => {
    setClipboard((prevClips) => prevClips.filter((_, i) => i !== index));
  };

  return (
    <Card className="flex-1 gap-md">
      <Typography variant="h2" color="secondary3">
        Clipboard
      </Typography>
      <Typography variant="body1">
        Click to copy to clipboard. Paste to add it here.
      </Typography>
      {clipboard.map((eachClip: string, index: number) => (
        <Box
          key={index}
          className="card"
          onClick={() => copyToClipboard(eachClip)}
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
            },
            // Flash error red color when the delete button is pressed
            '&:has(button:active)': {
              bgcolor: 'error.main',
            },
          }}
        >
          <div className="row nowrap flex-1 justify-between align-center">
            <Typography
              sx={{
                color: 'inherit',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              {eachClip}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteClip(index);
              }}
              sx={{
                color: 'text.secondary',
                transition: 'background-color 0.1s ease, transform 0.1s ease',
                '&:hover': {
                  color: 'error.main',
                },
                '&:active': {
                  bgcolor: 'error.main',
                  color: 'white',
                  transform: 'scale(0.98)',
                },
              }}
            >
              <CloseRounded />
            </IconButton>
          </div>
        </Box>
      ))}
    </Card>
  );
}

export default Clipboard;
