import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
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
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ width: { xs: '100%', md: '250px' }, mb: { xs: 2, md: 0 } }}>
        <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Box>
      <Container sx={{ mt: 3, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          All Tasks
        </Typography>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </Container>
    </Box>
  );
};

export default AllTasksPage;
