import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// --- FIX PART 1: Imported the 'Users' icon ---
import { LayoutDashboard, Settings, ChevronDown, Users } from 'lucide-react';

// --- FIX PART 2: Added the 'Users' section to the navigation array ---
const navItems = [
  { 
    label: 'Dashboard', 
    icon: LayoutDashboard, 
    href: '/dashboard' 
  },
  {
    label: 'General Settings',
    icon: Settings,
    basePath: '/settings',
    subItems: [
      { label: 'Website Settings', href: '/settings/website' },
    ],
  },
  // --- NEW SECTION ADDED HERE ---
  {
    label: 'Users',
    icon: Users, // Using the imported Users icon
    basePath: '/users', // The parent path for all user-related pages
    subItems: [
      { label: 'All Users', href: '/allusers' }, // Link to the AllUsers page
    ]
  }
];

const Sidebar = ({ isOpen, setOpen }) => {
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  // This logic correctly auto-opens the parent accordion if a child link is active.
  useEffect(() => {
    const newOpenSections = {};
    navItems.forEach(item => {
      if (item.subItems && location.pathname.startsWith(item.basePath)) {
        newOpenSections[item.label] = true;
      }
    });
    setOpenSections(newOpenSections);
  }, [location.pathname]);

  // This logic correctly closes the mobile sidebar on navigation.
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  }, [location.pathname, setOpen]);

  const toggleSection = (label) => {
    setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <>
      {isOpen && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" aria-hidden="true"></div>
      )}
      <aside className={`fixed top-0 left-0 z-50 h-screen w-64 border-r bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col bg-white">
          <div className="p-4 border-b">
            <img src="./src/Pages/admin_logo.png" alt="Vision Data Logo" className="h-10 w-auto" />
          </div>
          {/* The rest of the rendering logic remains unchanged as it's data-driven */}
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {!item.subItems ? (
                    <NavLink to={item.href} className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </NavLink>
                  ) : (
                    <div>
                      <button onClick={() => toggleSection(item.label)} className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${location.pathname.startsWith(item.basePath) ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <div className="flex items-center">
                          <item.icon className="h-5 w-5 mr-3" />
                          {item.label}
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${openSections[item.label] ? 'rotate-180' : ''}`} />
                      </button>
                      {openSections[item.label] && (
                        <ul className="pt-2 pl-5">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <NavLink to={subItem.href} className={({ isActive }) => `flex items-center rounded-lg w-full px-4 py-3 text-base font-medium transition-colors ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'}`}>
                                {subItem.label}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;