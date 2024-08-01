import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, TextField } from '@mui/material';
import { Inbox as InboxIcon, Notifications as NotificationsIcon, CalendarToday as CalendarIcon, Add as AddIcon, List as ListIcon, Restore as RestoreIcon } from '@mui/icons-material';

const Sidebar = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#E3F2FD', // Light blue color
          overflow: 'hidden', // Hide scrollbar
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List>
          <ListItem>
            <Typography variant="h5">Menu</Typography>
          </ListItem>
          <ListItem>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tasks by title"
              sx={{ mb: 2 }}
            />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/today')}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary="Today" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/reminders')}>
            <ListItemIcon><NotificationsIcon /></ListItemIcon>
            <ListItemText primary="Reminders" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/calendar')}>
            <ListItemIcon><CalendarIcon /></ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/all-tasks')}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="All Tasks" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Typography variant="h6">Lists</Typography>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/add-new-list')}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Add New List" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <Typography variant="h6">Trash</Typography>
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/recover-tasks')}>
            <ListItemIcon><RestoreIcon /></ListItemIcon>
            <ListItemText primary="Recover tasks" />
          </ListItem>
        </List>
        
        
      </Box>
    </Drawer>
  );
};

export default Sidebar;
