import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeAPI = {
  getAllEmployees: async () => {
    try {
      const response = await api.get('/employees');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch employees');
    }
  },

  
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch employee');
    }
  },

  
  createEmployee: async (employeeData) => {
    try {
      console.log('API createEmployee - sending data:', employeeData);
      const response = await api.post('/employees', employeeData);
      console.log('API createEmployee - response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API createEmployee - error:', error);
      throw new Error(error.response?.data?.error || 'Failed to create employee');
    }
  },

 
  updateEmployee: async (id, employeeData) => {
    try {
      console.log('API updateEmployee - sending data:', { id, employeeData });
      const response = await api.put(`/employees/${id}`, employeeData);
      console.log('API updateEmployee - response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API updateEmployee - error:', error);
      throw new Error(error.response?.data?.error || 'Failed to update employee');
    }
  },

  
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete employee');
    }
  },

 
  searchEmployees: async (query) => {
    try {
      const response = await api.get(`/employees/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to search employees');
    }
  },
};

export default employeeAPI;