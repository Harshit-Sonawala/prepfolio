import { Typography, Checkbox } from '@mui/material';
import DeleteIconButton from './DeleteIconButton';

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
      <DeleteIconButton onClick={() => props.onDelete(props.id)} />
    </div>
  );
}

export default TaskCard;
