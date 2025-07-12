import React from 'react';
// Correctly import what you need from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import your page components
// I'm assuming you've created a 'Pages' folder for them
import LoginPage from './Pages/LoginPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;