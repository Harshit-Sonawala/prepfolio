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

const TaskCard = (props: TaskCardProps) => {
  return (
    <div className="task-card">
      <div className="row nowrap flex-1 justify-between">
        <div className="row nowrap">
          <Checkbox
            checked={props.completed}
            onChange={() => props.onToggle(props.id)}
            color="secondary"
          />
          <Typography variant="body1">{props.title}</Typography>
        </div>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
