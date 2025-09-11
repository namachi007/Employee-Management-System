import React from 'react';
import EmployeeItem from './EmployeeItem';

const EmployeeList = ({ 
  employees, 
  onEditEmployee, 
  onDeleteEmployee, 
  loading 
}) => {
  return (
    <div className="p-6">
      
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

     

      {!loading && (
        <>
          {employees.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No employees found.
              </div>
              <p className="text-gray-400 mt-2">
                Get started by creating your first employee.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {employees.map((employee) => (
                <EmployeeItem
                  key={employee.id}
                  employee={employee}
                  onEdit={onEditEmployee}
                  onDelete={onDeleteEmployee}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeList;