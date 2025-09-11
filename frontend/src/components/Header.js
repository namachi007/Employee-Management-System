import React from 'react';
import { FiPlus } from 'react-icons/fi';

const Header = ({ onCreateEmployee }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Employee Dashboard
            </h1>
          </div>
          <button
            onClick={onCreateEmployee}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Create Employee
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;