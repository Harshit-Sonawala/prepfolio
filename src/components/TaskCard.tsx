import React from 'react';
import { Checkbox } from '@mui/material';

type TaskCardProps = {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  onToggle: (id: number) => void;
};

const TaskCard = (props: TaskCardProps) => {
  return (
    <div className="taskcard">
      <div className="row">
        <Checkbox
          checked={props.completed}
          onChange={() => props.onToggle(props.id)}
        />
        <h3>{props.title}</h3>
      </div>
    </div>
  );
};

export default TaskCard;
