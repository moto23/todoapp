import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodayPage from './components/TodayPage';
import AllTasksPage from './pages/AllTasksPage'; // Import AllTasksPage
import Sidebar from './components/Sidebar';
import CreateTask from './pages/CreateTask';
import RecoverTasksPage from './pages/RecoverTasksPage';
import RemindersPage from './pages/RemindersPage';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<CreateTask />} />
        <Route path="/all-tasks" element={<AllTasksPage />} />
        <Route path = "/add-new-list" element={<CreateTask/>}/>
        <Route path = "/recover-tasks" element={<RecoverTasksPage/>}/>
        <Route path="/today" element={<TodayPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/calendar" element={<CalendarPage />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
