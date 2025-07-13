// src/layouts/AppLayout.jsx

import React, { useState } from 'react';
import Header from './Header'; // Adjust path if needed
import Sidebar from './Sidebar'; // Adjust path if needed

const AppLayout = ({ children }) => {
  // Use window width to set the initial state for better SSR/initial render handling
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      
      {/* --- MODIFICATION START --- */}
      {/* The main content area now conditionally applies the margin and has a transition */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
      {/* --- MODIFICATION END --- */}
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;