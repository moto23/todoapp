import { useState, useEffect } from 'react';

const initialTasks = [
  {
    "id": 1,
    "title": "Learn React",
    "description": "Complete the React documentation tutorial.",
    "isDone": false,
    "timestamp": "2024-07-29T10:00:00Z"
  },
  {
    "id": 2,
    "title": "Build a Todo App",
    "description": "Create a todo list application using React.",
    "isDone": false,
    "timestamp": "2024-07-29T11:00:00Z"
  },
  {
    "id": 3,
    "title": "Review PRs",
    "description": "Review pull requests on GitHub.",
    "isDone": false,
    "timestamp": "2024-07-29T12:00:00Z"
  },
  {
    "id": 4,
    "title": "Write Blog Post",
    "description": "Write a new blog post on React hooks.",
    "isDone": false,
    "timestamp": "2024-07-29T13:00:00Z"
  },
  {
    "id": 5,
    "title": "Workout",
    "description": "Complete a 30-minute workout session.",
    "isDone": false,
    "timestamp": "2024-07-29T14:00:00Z"
  }
];

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [trashTasks, setTrashTasks] = useState([]);

  useEffect(() => {
    // Try to get tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedTrashTasks = JSON.parse(localStorage.getItem('trashTasks')) || [];
    
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      // Set initial tasks if no tasks are found in local storage
      setTasks(initialTasks);
    }

    setTrashTasks(storedTrashTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('trashTasks', JSON.stringify(trashTasks));
  }, [trashTasks]);

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), isDone: false, timestamp: new Date().toISOString() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, isDone: !task.isDone } : task))
    );
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setTrashTasks((prevTrashTasks) => [...prevTrashTasks, taskToDelete]);
  };

  const recoverTask = (taskId) => {
    const taskToRecover = trashTasks.find((task) => task.id === taskId);
    setTrashTasks((prevTrashTasks) => prevTrashTasks.filter((task) => task.id !== taskId));
    setTasks((prevTasks) => [...prevTasks, taskToRecover]);
  };

  const deleteTaskPermanently = (taskId) => {
    setTrashTasks((prevTrashTasks) => prevTrashTasks.filter((task) => task.id !== taskId));
  };

  return {
    tasks,
    trashTasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    recoverTask,
    deleteTaskPermanently,
  };
};

export default useTasks;
