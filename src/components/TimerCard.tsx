import {
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrowRounded,
  PauseRounded,
  StopRounded,
  ReplayRounded,
  CloseRounded,
  AddRounded,
} from '@mui/icons-material';
import { formatTime } from '../utils/formatTime';

type TimerCardProps = {
  id: number;
  title: string;
  initialSeconds: number;
  currentSeconds: number;
  isActive: boolean;
  togglePlay: (id: number) => void;
  onRestart: (id: number) => void;
  onAddMinute: (id: number) => void;
  onDelete: (id: number) => void;
};

const TimerCard = (props: TimerCardProps) => {
  // Determine button state based on timer conditions
  const getButtonState = () => {
    if (props.isActive && props.currentSeconds >= 0) {
      // Counting down - show Pause
      return { icon: <PauseRounded />, text: 'Pause' };
    } else if (props.isActive && props.currentSeconds < 0) {
      // Overtime (negative) - show Stop
      return { icon: <StopRounded />, text: 'Stop' };
    } else {
      // Paused or stopped - show Start
      return { icon: <PlayArrowRounded />, text: 'Start' };
    }
  };
  const buttonState = getButtonState();

  return (
    <div className="card bgcolor-surface-top gap-md">
      <div className="row justify-between align-start">
        <Typography variant="h3" className="pd-sm">
          {props.title}
        </Typography>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
      <div className="row justify-evenly gap-md">
        <div className="stack-parent bgcolor-surface-bright shape-circular pd-sm">
          <CircularProgress
            variant={props.currentSeconds > 0 ? 'determinate' : 'indeterminate'}
            disableShrink={false}
            sx={{
              '& .MuiCircularProgress-circle': {
                animationPlayState: props.isActive ? 'running' : 'paused',
              },
            }}
            value={(props.currentSeconds / props.initialSeconds) * 100}
            size={140}
            thickness={2.5}
            color={props.currentSeconds > 0 ? 'primary' : 'error'}
          />
          <div className="stack-child">
            <Typography
              variant={props.currentSeconds >= 3600 ? 'h2' : 'h1'}
              color="white"
              className="pd-lg"
            >
              {formatTime(props.currentSeconds)}
            </Typography>
          </div>
        </div>
        <div className="col justify-evenly align-stretch gap-md">
          <Button
            className="flex-1"
            variant="contained"
            startIcon={buttonState.icon}
            onClick={() => props.togglePlay(props.id)}
          >
            {buttonState.text}
          </Button>
          <Button
            className="flex-1"
            variant="contained"
            startIcon={<ReplayRounded />}
            onClick={() => props.onRestart(props.id)}
          >
            Restart
          </Button>
          <Button
            className="flex-1"
            variant="contained"
            startIcon={<AddRounded />}
            disabled={
              Math.abs(props.currentSeconds) + 60 > props.initialSeconds
            }
            onClick={() => props.onAddMinute(props.id)}
          >
            Add 1 Min
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
