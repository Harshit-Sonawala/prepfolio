import React from 'react';
import { Task } from '../models/Task';
import TaskCard from './TaskCard';

type Props = {};

const Tasks = (props: Props) => {
  return (
    <div className="card">
      <h2 className="color-sec-1 pd-y-md">Tasks</h2>
      <p className="pd-md">Add and remove tasks from your checklist.</p>
      <div className="spacer-y"></div>
      <div className="flex-1 col">
        <TaskCard
          id={0}
          title="First Task"
          description="This is the description of the first task."
          completed={false}
        ></TaskCard>
        <TaskCard
          id={1}
          title="Second Task"
          description="This is the description of the second task."
          completed={true}
        ></TaskCard>
        <TaskCard
          id={2}
          title="Third Task"
          description="This is the description of the third task."
          completed={false}
        ></TaskCard>
        <TaskCard
          id={3}
          title="Add New"
          description="Add Description..."
          completed={false}
        ></TaskCard>
      </div>
    </div>
  );
};

export default Tasks;
