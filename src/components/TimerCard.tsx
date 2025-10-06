import { Button, IconButton } from '@mui/material';
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
    <div className="timercard">
      <div className="row justify-between">
        <h3>{props.title}</h3>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
      <div className="spacer-y" />
      <div className="spacer-y" />
      <div className="row">
        <h1 className="flex-1 align-center">{props.seconds}</h1>
        <div className="row nowrap flex-1 align-center justify-between">
          {props.isActive ? (
            <Button variant="contained" startIcon={<StopRounded />}>
              STOP
            </Button>
          ) : (
            <Button variant="contained" startIcon={<PlayArrowRounded />}>
              START
            </Button>
          )}
          <Button variant="contained" startIcon={<ReplayRounded />}>
            RESTART
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerCard;
