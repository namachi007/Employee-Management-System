import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Layout from './components/Layout';
import TopBar from './components/TopBar';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import ConfirmationModal from './components/ConfirmationModal';
import { 
  fetchEmployees, 
  addNewEmployee, 
  updateExistingEmployee, 
  deleteExistingEmployee,
  filterEmployees 
} from './store/employeeSlice';
import {
  openEmployeeForm,
  closeEmployeeForm,
  openConfirmModal,
  closeConfirmModal,
  setSearchTerm,
  showNotification,
  hideNotification
} from './store/uiSlice';

function App() {
  const dispatch = useDispatch();
  
  
  const {
    filteredEmployees,
    status: loading,
    error
  } = useSelector(state => state.employees);
  
  const {
    editingEmployee,
    employeeToDelete,
    searchTerm,
    notification
  } = useSelector(state => state.ui);

  
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);


  useEffect(() => {
    dispatch(filterEmployees(searchTerm));
  }, [searchTerm, dispatch]);

  
  useEffect(() => {
    if (error) {
      dispatch(showNotification({ message: error, type: 'error' }));
    }
  }, [error, dispatch]);

  
  

  
  const handleCreateEmployee = () => {
    dispatch(openEmployeeForm(null));
  };

  
  const handleEditEmployee = (employee) => {
    dispatch(openEmployeeForm(employee));
  };

  
  const handleFormSubmit = async (formData) => {
    try {
      if (editingEmployee) {
        await dispatch(updateExistingEmployee({ id: editingEmployee.id, employeeData: formData })).unwrap();
        dispatch(showNotification({ message: 'Employee updated successfully!' }));
      } else {
        await dispatch(addNewEmployee(formData)).unwrap();
        dispatch(showNotification({ message: 'Employee created successfully!' }));
      }
      
      dispatch(closeEmployeeForm());
    } catch (error) {
      dispatch(showNotification({ message: error, type: 'error' }));
    }
  };

  
  const handleDeleteEmployee = (employee) => {
    dispatch(openConfirmModal(employee));
  };

  
  const confirmDeleteEmployee = async () => {
    if (!employeeToDelete) return;
    
    try {
      await dispatch(deleteExistingEmployee(employeeToDelete.id)).unwrap();
      dispatch(showNotification({ message: 'Employee deleted successfully!' }));
      dispatch(closeConfirmModal());
    } catch (error) {
      dispatch(showNotification({ message: error, type: 'error' }));
    }
  };

  
  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  return (
    <Layout>
      <TopBar
        pageTitle="Employees"
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onCreateEmployee={handleCreateEmployee}
      />

      
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <div className="flex items-center">
            <span>{notification.message}</span>
            <button
              onClick={() => dispatch(hideNotification())}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      
      <div className="flex-1 bg-gray-50">
        <EmployeeList
          employees={filteredEmployees}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          loading={loading === 'loading'}
        />
      </div>

      
      <EmployeeForm
        onSubmit={handleFormSubmit}
        employee={editingEmployee}
      />

      
      <ConfirmationModal
        onConfirm={confirmDeleteEmployee}
      />
    </Layout>
  );
}

export default App;
