// src/layouts/AppLayout.jsx

import React, { useState } from 'react';
import Header from './Header'; // Adjust path if needed
import Sidebar from './Sidebar'; // Adjust path if needed

const AppLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:ml-64">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;