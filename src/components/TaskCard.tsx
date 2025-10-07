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
            checked={props.completed}
            onChange={() => props.onToggle(props.id)}
            // style={{ color: '#60daff' }}
            sx={{
              color: '#60daff !important',
              '& .MuiSvgIcon-root': {
                // Target the SVG icon inside
                color: '#60daff',
              },
              '&.Mui-checked': {
                color: '#60daff',
                '& .MuiSvgIcon-root': {
                  color: '#60daff',
                },
              },
            }}
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
