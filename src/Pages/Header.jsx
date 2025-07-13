// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // 1. Import the Link component
import { Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';

const Header = ({ onMenuClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const AbhasthraLogo = () => (
    <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.529,86.641l41.22-74.963l41.22,74.963H8.529z" fill="url(#paint0_linear_1_2)"/>
      <path d="M50.24,19.349L31.33,52.898h37.82L50.24,19.349z" fill="#facc15" />
      <defs>
        <linearGradient id="paint0_linear_1_2" x1="50" y1="11.678" x2="50" y2="86.641" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316"/>
          <stop offset="1" stopColor="#ea580c"/>
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm flex items-center justify-between h-16">
      {/* Hamburger button - now works on all screen sizes */}
      <button
        onClick={onMenuClick}
        className="h-full w-16 flex items-center justify-center bg-[#EF4444] text-white hover:bg-[#DC2626] transition-colors"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="relative pr-4" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <AbhasthraLogo />
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-40">
            <div className="py-1">
              <a href="#" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User className="mr-3 h-4 w-4" />Profile
              </a>
              {/* --- MODIFICATION START --- */}
              {/* Replaced <a> with <Link> and set the 'to' prop to the correct route */}
              <Link to="/settings/website" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings className="mr-3 h-4 w-4" />Settings
              </Link>
              {/* --- MODIFICATION END --- */}
              <a href="/login" className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <LogOut className="mr-3 h-4 w-4" />Logout
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;