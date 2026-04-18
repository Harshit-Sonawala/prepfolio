import { Typography, Checkbox, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type TaskCardProps = {
  id: number;
  title: string;
  dueDate?: Date;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskCard(props: TaskCardProps) {
  return (
    <div className="row nowrap flex-1 justify-between">
      <div className="row nowrap">
        <Checkbox
          checked={props.completed}
          onChange={() => props.onToggle(props.id)}
          color="secondary"
        />
        <Typography variant={props.completed ? 'body2' : 'body1'}>
          {props.title}
        </Typography>
      </div>
      <IconButton
        onClick={() => props.onDelete(props.id)}
        sx={{
          color: 'text.secondary',
          transition: 'background-color 0.1s ease',
          '&:hover': {
            color: 'error.main',
          },
          '&:active': {
            bgcolor: 'error.main',
            color: 'white',
          },
        }}
      >
        <CloseRounded />
      </IconButton>
    </div>
  );
}

export default TaskCard;
