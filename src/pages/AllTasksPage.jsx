// src/pages/AllTasksPage.jsx
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import TaskList from '../components/TaskList';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';

const AllTasksPage = () => {
  const { tasks, toggleTaskCompletion, updateTask, deleteTask } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 3, ml: 2, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          All Tasks
        </Typography>
        <Box>
          <TaskList
            tasks={filteredTasks}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default AllTasksPage;
