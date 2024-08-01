import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, TextField, IconButton } from '@mui/material';
import { Inbox as InboxIcon, Notifications as NotificationsIcon, CalendarToday as CalendarIcon, Add as AddIcon, List as ListIcon, Restore as RestoreIcon, Menu as MenuIcon } from '@mui/icons-material';

const Sidebar = ({ searchQuery, setSearchQuery, mobileOpen, handleDrawerToggle, isMobile }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) handleDrawerToggle();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const drawerContent = (
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
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#E3F2FD',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
