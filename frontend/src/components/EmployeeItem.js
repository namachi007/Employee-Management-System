import React from 'react';
import { FiEdit3, FiTrash2, FiMail, FiBriefcase, FiUsers, FiMoreVertical } from 'react-icons/fi';

const EmployeeItem = ({ employee, onEdit, onDelete }) => {
 
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };
  

  const renderAvatar = () => {
    if (employee.imageUrl) {
      return (
        <img
          src={employee.imageUrl}
          alt={`${employee.name}'s profile`}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      );
    }
    return null;
  };

  const renderInitialsAvatar = () => (
    <div 
      className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold text-lg border-2 border-gray-200 ${getAvatarColor(employee.name)} ${employee.imageUrl ? 'hidden' : 'flex'}`}
    >
      {getInitials(employee.name)}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group">
      {/* Profile Picture */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          {renderAvatar()}
          {renderInitialsAvatar()}
        </div>
      </div>


      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 text-center">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {employee.name}
          </h3>
        </div>
        

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
            <FiMoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-gray-600">
          <FiMail className="w-4 h-4 mr-3 text-gray-400" />
          <span className="text-sm truncate">{employee.email}</span>
        </div>
        
        {employee.position && (
          <div className="flex items-center text-gray-600">
            <FiBriefcase className="w-4 h-4 mr-3 text-gray-400" />
            <span className="text-sm">{employee.position}</span>
          </div>
        )}
        
        {employee.department && (
          <div className="flex items-center text-gray-600">
            <FiUsers className="w-4 h-4 mr-3 text-gray-400" />
            <span className="text-sm">{employee.department}</span>
          </div>
        )}
      </div>

      {/* Actions - Edit, Delete */}
      <div className="flex space-x-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(employee)}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          title="Edit Employee"
        >
          <FiEdit3 className="w-4 h-4 mr-2" />
          Edit
        </button>
        
        <button
          onClick={() => onDelete(employee)}
          className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
          title="Delete Employee"
        >
          <FiTrash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeItem;