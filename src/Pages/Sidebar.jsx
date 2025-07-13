import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// The Bell icon is already imported
import { LayoutDashboard, Settings, ChevronDown, Users, Smile, Vote, Database, FileText, Briefcase, MapPin, Blocks, User, Bell } from 'lucide-react';

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
  {
    label: 'Users',
    icon: Users,
    basePath: '/users',
    subItems: [
      { label: 'All Users', href: '/allusers' },
    ]
  },
  {
    label: 'Emoji',
    icon: Smile,
    basePath: '/emoji',
    subItems: [
      { label: 'Add Emoji', href: '/addemoji' },
      { label: 'All Emoji', href: '/allemoji' },
    ]
  },
  {
    label: 'Elections',
    icon: Vote,
    basePath: '/election',
    subItems: [
      { label: 'Add Election', href: '/addelection' },
      { label: 'All Elections', href: '/allelection' },
    ]
  },
  {
    label: 'Survey Data',
    icon: Database,
    basePath: '/survey',
    subItems: [
      { label: 'All Survey Data', href: '/allsurveydata' },
    ]
  },
  {
    label: 'Questions',
    icon: FileText,
    basePath: '/questions',
    subItems: [
      { label: 'Add Question', href: '/addquestions' },
      { label: 'All Question', href: '/allquestions' },
    ]
  },
  {
    label: 'Question Options',
    icon: Briefcase,
    basePath: '/options',
    subItems: [
      { label: 'Add Option', href: '/addoption' },
      { label: 'All Options', href: '/alloptions' },
    ]
  },
  {
    label: 'Zone',
    icon: MapPin,
    basePath: '/zone',
    subItems: [
      { label: 'Add Zone', href: '/addzone' },
      { label: 'All Zone', href: '/allzone' },
    ]
  },
  {
    label: 'Party',
    icon: Blocks,
    basePath: '/party',
    subItems: [
      { label: 'Add Party', href: '/addparty' },
      { label: 'All Party', href: '/allparty' },
    ]
  },
  {
    label: 'Candidates',
    icon: User,
    basePath: '/candidates',
    subItems: [
      { label: 'Add Candidate', href: '/addcandidates' },
      { label: 'All Candidates', href: '/allcandidates' },
    ]
  },
  {
    label: 'Notification',
    // --- FIX: Uncommented the line below to add the Bell icon ---
    icon: Bell, 
    basePath: '/notification',
    subItems: [
      { label: 'Add Notification', href: '/addnotification' },
      { label: 'All Notifications', href: '/allnotifications' },
    ]
  }
];

const Sidebar = ({ isOpen, setOpen }) => {
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  useEffect(() => {
    const newOpenSections = {};
    navItems.forEach(item => {
      const isChildActive = item.subItems?.some(sub => location.pathname === sub.href);
      if (isChildActive) {
        newOpenSections[item.label] = true;
      }
    });
    setOpenSections(newOpenSections);
  }, [location.pathname]);

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
            <img src="/src/Pages/admin_logo.png" alt="Vision Data Logo" className="h-10 w-auto" />
          </div>
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {!item.subItems ? (
                    <NavLink to={item.href} className={({ isActive }) => `flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                      {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                      {item.label}
                    </NavLink>
                  ) : (
                    <div>
                      <button 
                        onClick={() => toggleSection(item.label)} 
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                          openSections[item.label] || item.subItems.some(sub => location.pathname === sub.href) 
                            ? 'bg-gray-200 text-gray-900' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                          {item.label}
                        </div>
                        <ChevronDown className={`h-5 w-5 transition-transform ${openSections[item.label] ? 'rotate-180' : ''}`} />
                      </button>
                      {openSections[item.label] && (
                        <ul className="pt-2 pl-5">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <NavLink to={subItem.href} className={({ isActive }) => `flex items-center rounded-lg w-full px-4 py-3 text-sm font-medium transition-colors ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
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