import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Box, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const TaskItem = ({ task, toggleTaskCompletion, updateTask, deleteTask, color }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditOpen = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updateTask({ ...task, title: editedTitle, description: editedDescription });
    handleEditClose();
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          backgroundColor: color,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          transition: '0.3s',
          '&:hover': {
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)',
          },
          position: 'relative',
        }}
      >
        {task.isDone && (
          <CheckCircleIcon
            sx={{
              color: 'green',
              position: 'absolute',
              top: 8,
              right: 8,
              fontSize: 24,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div">
            {task.title}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button onClick={() => toggleTaskCompletion(task.id)} sx={{ mr: 1 }}>
              {task.isDone ? 'Mark as Undone' : 'Mark as Done'}
            </Button>
            <Button onClick={() => setExpanded(!expanded)} sx={{ mr: 1 }}>
              {expanded ? 'Hide Details' : 'Show Details'}
            </Button>
            <Button onClick={handleEditOpen} sx={{ mr: 1 }}>
              Edit
            </Button>
            <IconButton onClick={handleDelete} sx={{ float: 'right' }}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Collapse in={expanded}>
            <>
              <Typography sx={{ mt: 2 }}>{task.description}</Typography>
              <Typography variant="caption" sx={{ mt: 1 }}>
                Last updated: {new Date(task.timestamp).toLocaleString()}
              </Typography>
            </>
          </Collapse>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }} sx={{ mt: 2 }}>
            <TextField
              label="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
