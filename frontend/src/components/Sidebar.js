import React from 'react';
import { 
  FiGrid, 
  FiUsers, 
  FiCalendar, 
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiX
} from 'react-icons/fi';

const Sidebar = ({ onCloseMobile }) => {
  const navigationItems = [
    { name: 'Dashboard', icon: FiGrid, active: false, href: '#' },
    { name: 'Employees', icon: FiUsers, active: true, href: '#' },
    { name: 'Calendar', icon: FiCalendar, active: false, href: '#' },
    { name: 'Messages', icon: FiMessageSquare, active: false, href: '#' },
  ];

  const bottomItems = [
    { name: 'Settings', icon: FiSettings, active: false, href: '#' },
    { name: 'Logout', icon: FiLogOut, active: false, href: '#' },
  ];

  const NavItem = ({ item, onClick }) => (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
      className={`
        group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
        ${item.active 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
      `}
    >
      <item.icon 
        className={`
          mr-3 h-5 w-5 transition-colors duration-200
          ${item.active 
            ? 'text-white' 
            : 'text-gray-400 group-hover:text-gray-500'
          }
        `} 
      />
      {item.name}
    </a>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      

      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RS</span>
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-900">RS-TECH</span>
        </div>
        
        {/* for mobile - close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
        >
          <FiX className="h-5 w-5" />
        </button>
      </div>

      
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <NavItem 
              key={index} 
              item={item} 
              onClick={onCloseMobile}
            />
          ))}
        </div>
      </nav>

      
      {/* Bottom */}
      <div className="px-4 pb-6 space-y-1 border-t border-gray-200 pt-6">
        {bottomItems.map((item, index) => (
          <NavItem 
            key={index} 
            item={item} 
            onClick={onCloseMobile}
          />
        ))}
      </div>


      
      <div className="px-4 pb-6">
        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">N</span>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Namachi
            </p>
            <p className="text-xs text-gray-500 truncate">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;