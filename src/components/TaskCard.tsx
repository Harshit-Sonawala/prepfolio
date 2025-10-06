import { Checkbox, IconButton } from '@mui/material';
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
    <div className="taskcard">
      <div className="row nowrap flex-1 justify-between">
        <div className="row nowrap">
          <Checkbox
            color="primary"
            checked={props.completed}
            onChange={() => props.onToggle(props.id)}
          />
          <p>{props.title}</p>
        </div>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
