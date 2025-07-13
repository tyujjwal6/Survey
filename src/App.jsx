// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import your new layout
import AppLayout from './Pages/AppLayout';

// Import your page components using your specified paths
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import WebsiteSettings from './Pages/GeneralSettings/WebsiteSettings';
import AllUsers from './Pages/Users/AllUsers';
import AddEmoji from './Pages/Emoji/AddEmoji';
import AllEmoji from './Pages/Emoji/AllEmoji';
import AddElection from './Pages/Elections/AddElection';
import AllElections from './Pages/Elections/AllElections';
import AllSurveyData from './Pages/SurveyData/AllSurveyData';
import AddQuestions from './Pages/Questions/AddQuestions';
import AllQuestions from './Pages/Questions/AllQuestions';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- Public Routes (No Layout) --- */}
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* --- Main App Routes (Wrapped in AppLayout) --- */}
        <Route 
          path="/*" 
          element={
            <AppLayout>
              <Routes>
                {/* Define all your layout-based pages here */}
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/allusers" element={<AllUsers />} />
                <Route path="/addemoji" element={<AddEmoji />} />
                <Route path="/allemoji" element={<AllEmoji />} />
                <Route path="/addelection" element={<AddElection />} />
                <Route path="/allelection" element={<AllElections />} />
                <Route path="/allsurveydata" element={<AllSurveyData />} />
                <Route path="/addquestions" element={<AddQuestions />} />
                <Route path="/allquestions" element={<AllQuestions />} />


                {/* IMPORTANT: Use the path that your Sidebar expects for active styling */}
                <Route path="/settings/website" element={<WebsiteSettings />} />

                {/* A catch-all to redirect any unknown path within the app to the dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" />} />
              </Routes>
            </AppLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;