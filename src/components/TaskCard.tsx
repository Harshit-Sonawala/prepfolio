import React from 'react';

type TaskCardProps = {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
};

const TaskCard = (props: TaskCardProps) => {
  return (
    <div className="taskcard">
      <div className="row">
        {props.completed ? (
          <input type="checkbox" checked={true} />
        ) : (
          <input type="checkbox" checked={false} />
        )}
        <div className="spacer-x" />
        <div className="col">
          <h3>{props.title}</h3>
          <div className="spacer-y-sm" />
          <p className="color-on-surface-dark">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
