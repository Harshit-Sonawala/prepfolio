import { useState, useEffect } from 'react';
import { Task } from '../models/Task';
import { load } from '@tauri-apps/plugin-store';

import TaskCard from './TaskCard';
import { Card, Typography, Checkbox } from '@mui/material';

function Tasks() {
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

  const addNewTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  return (
    <Card className="gap-md pd-lg">
      <Typography variant="h2" color="secondary">
        Tasks
      </Typography>
      <Typography variant="body1">
        Manage your task checklists. Enter adds a new task.
      </Typography>
      <Card sx={{ bgcolor: 'surfaceTop' }}>
        {
          // make this Card look like <div className="card bgcolor-surface-top gap-md"></div>
        }
        {tasks.map((eachTask: Task) => (
          <TaskCard
            key={eachTask.id}
            id={eachTask.id}
            title={eachTask.title}
            completed={eachTask.completed}
            onToggle={toggleTaskCompleted}
            onDelete={deleteTask}
          />
        ))}
        <div className="row nowrap flex-1">
          <Checkbox checked={false} />
          <input
            type="text"
            name="newTaskTitle"
            className="inline-input"
            placeholder="New Task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={addNewTask}
          />
        </div>
      </Card>
    </Card>
  );
}

export default Tasks;
