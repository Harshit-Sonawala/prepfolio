import { Button, IconButton, CircularProgress } from '@mui/material';
import {
  PlayArrowRounded,
  StopRounded,
  ReplayRounded,
  CloseRounded,
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
    <div className="timercard gap-sm">
      <div className="row justify-between">
        <h3>{props.title}</h3>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
      <div className="row gap-md">
        <div className="stackparent">
          <CircularProgress
            variant="determinate"
            value={props.seconds}
            size={120}
            thickness={2.5}
            color="primary"
          />
          <div className="stackchild">
            <h1 className="color-sec-2">{props.seconds}</h1>
          </div>
        </div>
        <div className="row nowrap flex-1 align-center justify-between gap-md">
          {props.isActive ? (
            <Button
              className="flex-1"
              variant="contained"
              startIcon={<StopRounded />}
            >
              STOP
            </Button>
          ) : (
            <Button
              className="flex-1"
              variant="contained"
              startIcon={<PlayArrowRounded />}
            >
              START
            </Button>
          )}
          <Button
            className="flex-1"
            variant="contained"
            startIcon={<ReplayRounded />}
          >
            RESTART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
