// src/pages/CreateTask.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Collapse, Paper, Button, TextField, Dialog, Grid, Snackbar, Alert } from '@mui/material';
import TaskList from '../components/TaskList';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';

const CreateTask = () => {
  const { tasks, addTask, updateTask, toggleTaskCompletion, deleteTask } = useTasks();
  const [isFormMinimized, setIsFormMinimized] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddTask = (task) => {
    if (!task.title || !task.description) {
      setError('Both title and description are required.');
      setOpenSnackbar(true);
      return;
    }
    addTask(task);
    setIsDialogOpen(false);
    setIsFormMinimized(true);
    setIsTaskAdded(true);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 5, ml: -1, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
          HELPSTiR
        </Typography>

        {!isTaskAdded && (
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box component="form" onSubmit={(e) => {
              e.preventDefault();
              handleAddTask({ title: e.target.title.value, description: e.target.description.value });
              e.target.reset();
            }} sx={{ mt: 2 }}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Task
              </Button>
            </Box>
          </Paper>
        )}

        {isTaskAdded && (
          <Box>
            <Collapse in={isFormMinimized} timeout="auto">
              <TaskList tasks={filteredTasks} toggleTaskCompletion={toggleTaskCompletion} updateTask={updateTask} deleteTask={deleteTask} />
            </Collapse>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ p: 2, mb: 2, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setIsDialogOpen(true)}>
                  <Typography variant="h5">+ Add New Task</Typography>
                </Paper>
              </Grid>
            </Grid>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
              <TaskForm addTask={handleAddTask} />
            </Dialog>
          </Box>
        )}

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreateTask;
