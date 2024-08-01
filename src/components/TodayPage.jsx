import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';

const TodayPage = () => {
  const { tasks, toggleTaskCompletion, updateTask, deleteTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const today = new Date().toISOString().split('T')[0]; 

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  const todaysTasks = filteredTasks.filter(task => {
    const taskDate = new Date(task.timestamp).toISOString().split('T')[0];
    return taskDate === today;
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 3, ml: 2, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Today's Tasks
        </Typography>
        <Box>
          <TaskList
            tasks={todaysTasks} // Use the filtered tasks for today
            toggleTaskCompletion={toggleTaskCompletion}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TodayPage;
