import {
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrowRounded,
  StopRounded,
  ReplayRounded,
  CloseRounded,
  AddRounded,
} from '@mui/icons-material';

type TimerCardProps = {
  id: number;
  title: string;
  seconds: number;
  isActive: boolean;
  togglePlay: (id: number) => void;
  onRestart: (id: number) => void;
  onDelete: (id: number) => void;
};

const TimerCard = (props: TimerCardProps) => {
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
              value={props.seconds}
              size={120}
              thickness={2.5}
              color="primary"
            />
            <div className="stack-child">
              <Typography variant="h1" color="white">
                {props.seconds}
              </Typography>
            </div>
          </div>
        </div>
        <div className="col justify-evenly align-stretch gap-md">
          {props.isActive ? (
            <Button
              className="flex-1"
              variant="contained"
              startIcon={<StopRounded />}
            >
              Stop
            </Button>
          ) : (
            <Button
              className="flex-1"
              variant="contained"
              startIcon={<PlayArrowRounded />}
            >
              Start
            </Button>
          )}
          <Button
            className="flex-1"
            variant="contained"
            startIcon={<ReplayRounded />}
          >
            Restart
          </Button>
          <Button
            className="flex-1"
            variant="contained"
            startIcon={<AddRounded />}
          >
            Add 1 Min
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
