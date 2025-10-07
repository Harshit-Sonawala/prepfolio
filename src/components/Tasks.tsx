import { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { load } from '@tauri-apps/plugin-store';

import TaskCard from './TaskCard';
import { Checkbox } from '@mui/material';

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  // load tasks from file on mount
  useEffect(() => {
    const loadTasks = async () => {
      const fileStore = await load('tasks.json');
      const allTasks = await fileStore.get<Task[]>('allTasks');
      if (allTasks) {
        setTasks(allTasks);
      }
      setIsFileLoaded(true); // mark file loaded
      console.log('Loaded Tasks');
    };
    loadTasks();
  }, []);

  // save tasks whenever they change & only after isFileLoaded
  useEffect(() => {
    if (!isFileLoaded) return;

    const saveTasks = async () => {
      const fileStore = await load('tasks.json');
      await fileStore.set('allTasks', tasks);
      await fileStore.save();
      console.log('Saved Tasks');
    };
    saveTasks();
  }, [tasks, isFileLoaded]);

  const toggleTaskCompleted = (taskId: number) => {
    setTasks(
      tasks.map((eachTask) =>
        eachTask.id === taskId
          ? { ...eachTask, completed: !eachTask.completed }
          : eachTask
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((eachTask) => eachTask.id !== taskId));
  };

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
    <div className="card gap-sm">
      <h2 className="color-sec-1">Tasks</h2>
      <p>Manage your task checklists. Enter adds a new task.</p>
      <div className="card-surface-top gap-sm">
        {tasks.map((eachTask) => (
          <TaskCard
            key={eachTask.id}
            id={eachTask.id}
            title={eachTask.title}
            completed={eachTask.completed}
            onToggle={toggleTaskCompleted}
            onDelete={deleteTask}
          />
        ))}
        <div className="taskcard">
          <div className="row nowrap">
            <Checkbox checked={false} />
            <input
              type="text"
              name="newTaskTitle"
              className="inline-input"
              placeholder="New Task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
