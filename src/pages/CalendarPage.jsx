import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useTasks from '../utils/useTasks';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const { tasks } = useTasks();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // Map tasks to events for the calendar
    const mappedEvents = tasks.map(task => ({
      title: task.title,
      start: new Date(task.timestamp),
      end: new Date(task.timestamp),
    }));
    setEvents(mappedEvents);
    setFilteredEvents(mappedEvents);
  }, [tasks]);

  useEffect(() => {
    // Filter events based on search query
    if (searchQuery) {
      setFilteredEvents(events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredEvents(events);
    }
  }, [searchQuery, events]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 3, ml: 2, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Calendar
        </Typography>
        
        <Paper elevation={3} sx={{ p: 2 }}>
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default CalendarPage;
