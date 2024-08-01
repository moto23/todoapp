// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

const TaskForm = ({ addTask, updateTask, existingTask }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      updateTask({ ...existingTask, title, description });
    } else {
      addTask({ title, description });
    }
    setTitle('');
    setDescription('');
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          {existingTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
