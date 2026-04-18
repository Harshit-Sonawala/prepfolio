import {
  Card,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrowRounded,
  PauseRounded,
  StopRounded,
  ReplayRounded,
  AddRounded,
} from '@mui/icons-material';
import { formatTime } from '../utils/formatTime';
import DeleteIconButton from './DeleteIconButton';

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

function TimerCard(props: TimerCardProps) {
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
    <Card sx={{ backgroundColor: 'surfaceTop' }}>
      <div className="row justify-between align-start">
        <Typography variant="h3" className="pd-sm">
          {props.title}
        </Typography>
        <DeleteIconButton onClick={() => props.onDelete(props.id)} />
      </div>
      <div className="row justify-evenly gap-md">
        <Card
          sx={{
            backgroundColor: 'surfaceBright',
            borderRadius: '50%',
            padding: '0.5rem',
          }}
          className="stack-parent"
        >
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
              color="textPrimary"
              className="pd-lg"
            >
              {formatTime(props.currentSeconds)}
            </Typography>
          </div>
        </Card>
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
            disabled={props.currentSeconds === props.initialSeconds}
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
    </Card>
  );
}

export default TimerCard;
