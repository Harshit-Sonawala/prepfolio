import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

type TaskCardProps = {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TaskCard = (props: TaskCardProps) => {
  return (
    <div className="taskcard">
      <div className="row flex-1 justify-between">
        <div className="row">
          <Checkbox
            checked={props.completed}
            onChange={() => props.onToggle(props.id)}
          />
          <h3>{props.title}</h3>
        </div>
        <IconButton onClick={() => props.onDelete(props.id)}>
          <CloseRounded />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskCard;
