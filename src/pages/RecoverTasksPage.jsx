import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import TaskItem from '../components/TaskItem';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';

const RecoverTasksPage = () => {
  const { trashTasks, recoverTask, deleteTaskPermanently } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrashTasks, setFilteredTrashTasks] = useState(trashTasks);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTrashTasks(trashTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTrashTasks(trashTasks);
    }
  }, [searchQuery, trashTasks]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
          Recover Tasks
        </Typography>
       
        <Grid container spacing={2}>
          {filteredTrashTasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <TaskItem
                task={task}
                toggleTaskCompletion={() => {}}
                updateTask={() => {}}
                deleteTask={deleteTaskPermanently}
                color="#FFEBEE" // Light red color for tasks to recover
              />
              <Button
                onClick={() => recoverTask(task.id)}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Recover Task
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default RecoverTasksPage;
