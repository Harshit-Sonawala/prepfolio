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
    <div className="timer-card gap-sm">
      <div className="row justify-between">
        <Typography variant="h3" color="secondaryColor2">
          {props.title}
        </Typography>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
      <div className="row justify-evenly">
        <div className="bgcolor-surface-bright border-circular">
          <div className="stack-parent">
            <CircularProgress
              variant="determinate"
              value={(props.currentSeconds / props.initialSeconds) * 100}
              size={120}
              thickness={2.5}
              color="primary"
            />
            <div className="stack-child">
              <Typography variant="h1" color="white">
                {props.currentSeconds}
              </Typography>
            </div>
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
            disabled={props.currentSeconds + 60 > props.initialSeconds}
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
