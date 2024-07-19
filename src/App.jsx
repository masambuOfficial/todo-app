import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css'; // Import Tailwind CSS


function App() {
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage on initial render
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    // Save tasks to localStorage whenever the tasks state changes
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4 md:text-left text-center">Task Management Tool</h1>
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t">
        <TaskForm addTask={addTask} />
      </div>
    </div>
  );
}

export default App;