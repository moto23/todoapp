import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Button, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the styles for the calendar
import Sidebar from '../components/Sidebar';
import useTasks from '../utils/useTasks';

const RemindersPage = () => {
  const { tasks, updateTask } = useTasks();
  const [reminderTaskId, setReminderTaskId] = useState(null);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTasks(tasks);
    }
  }, [searchQuery, tasks]);

  const handleSetReminder = (taskId) => {
    setReminderTaskId(taskId);
    setIsDialogOpen(true);
  };

  const handleSaveReminder = () => {
    if (reminderTaskId && reminderDate) {
      const updatedTask = tasks.find(task => task.id === reminderTaskId);
      updatedTask.reminder = reminderDate.toISOString();
      updateTask(updatedTask);
      setIsDialogOpen(false);
      setReminderTaskId(null);
      setReminderDate(new Date());
    }
  };

  const handleCalendarChange = (date) => {
    setReminderDate(date);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 3, ml: 2, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Reminders
        </Typography>

        <Typography variant="h6" sx={{ mt: 2 }}>Calendar View</Typography>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Calendar
            onChange={handleCalendarChange}
            value={reminderDate}
            tileContent={({ date, view }) => {
              const taskWithReminder = tasks.find(task => new Date(task.reminder).toDateString() === date.toDateString());
              return taskWithReminder ? <span>🔔</span> : null;
            }}
          />
        </Paper>

    

        <Typography variant="h6">Tasks</Typography>
        <List>
          {filteredTasks.map((task) => (
            <ListItem key={task.id}>
              <ListItemText
                primary={task.title}
                secondary={`Reminder: ${task.reminder ? new Date(task.reminder).toLocaleString() : 'No reminder set'}`}
              />
              <Button variant="contained" onClick={() => handleSetReminder(task.id)}>
                Set Reminder
              </Button>
            </ListItem>
          ))}
        </List>

        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <DialogTitle>Set Reminder</DialogTitle>
          <DialogContent>
            <Typography variant="body1">Select a date for the reminder:</Typography>
            <Calendar
              onChange={handleCalendarChange}
              value={reminderDate}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveReminder} variant="contained">Save Reminder</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default RemindersPage;
