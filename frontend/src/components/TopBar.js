import React from 'react';
import { 
  FiSearch, 
  FiPlus, 
  FiBell, 
  FiSettings, 
  FiChevronDown 
} from 'react-icons/fi';

const TopBar = ({ 
  pageTitle = "Employees",
  searchTerm,
  onSearchChange,
  onCreateEmployee,
  showSearch = true,
  showCreateButton = true
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        
        {/* Left side - Page Title */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
        </div>

        {/* Center - Search bar */}
        {showSearch && (
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search employees..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        )}

        {/* Right side  */}
        <div className="flex items-center space-x-4">

          {/*Create Employee Button*/}
          {showCreateButton && (
            <button
              onClick={onCreateEmployee}
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
          )}

          {/*Notification Icon*/}
          <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/*Settings Icon*/}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <FiSettings className="h-5 w-5" />
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">N</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Namachi</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <FiChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;