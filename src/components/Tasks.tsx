import { useState } from 'react';
import { Task } from '../models/Task';
import TaskCard from './TaskCard';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: Date.now() % 100000, // Convert timestamp to 5digit id
        title: newTaskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle(''); // Clear input
    }
  };

  return (
    <div className="card">
      <h2 className="color-sec-1 pd-y-md">Tasks</h2>
      <p className="pd-md">
        Manage your task checklist. Enter adds a new task.
      </p>
      <div className="spacer-y"></div>
      <div className="flex-1 col">
        {/* <TaskCard id={0} title="First Task" completed={false}></TaskCard>
        <TaskCard id={1} title="Second Task" completed={true}></TaskCard>
        <TaskCard id={2} title="Third Task" completed={false}></TaskCard> */}
        {tasks.map((eachTask) => (
          <TaskCard
            key={eachTask.id}
            id={eachTask.id}
            title={eachTask.title}
            completed={eachTask.completed}
          />
        ))}
        <div className="taskcard">
          <div className="row">
            <input type="checkbox" checked={false} />
            <div className="spacer-x" />
            <div className="col">
              <input
                type="text"
                className="inline-input"
                placeholder="Add New Task..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
