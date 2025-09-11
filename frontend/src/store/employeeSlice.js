import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { employeeAPI } from '../services/api';


export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (_, { rejectWithValue }) => {
    try {
      const data = await employeeAPI.getAllEmployees();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewEmployee = createAsyncThunk(
  'employees/addNewEmployee',
  async (employeeData, { rejectWithValue }) => {
    try {
      const newEmployee = await employeeAPI.createEmployee(employeeData);
      return newEmployee;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateExistingEmployee = createAsyncThunk(
  'employees/updateExistingEmployee',
  async ({ id, employeeData }, { rejectWithValue }) => {
    try {
      const updatedEmployee = await employeeAPI.updateEmployee(id, employeeData);
      return { id, ...updatedEmployee };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteExistingEmployee = createAsyncThunk(
  'employees/deleteExistingEmployee',
  async (id, { rejectWithValue }) => {
    try {
      await employeeAPI.deleteEmployee(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  employees: [],
  filteredEmployees: [],
  status: 'idle', 
  error: null,
  formLoading: false,
  deleteLoading: false
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    filterEmployees: (state, action) => {
      const searchTerm = action.payload;
      if (!searchTerm || searchTerm.trim() === '') {
        state.filteredEmployees = [...state.employees];
      } else {
        state.filteredEmployees = state.employees.filter(employee =>
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (employee.position && employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (employee.department && employee.department.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = [...action.payload];
        state.filteredEmployees = [...action.payload];
        state.error = null;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error?.message || 'Failed to fetch employees';
      })
      

      
      .addCase(addNewEmployee.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.formLoading = false;
        state.employees = [...state.employees, action.payload];
        state.filteredEmployees = [...state.employees];
        state.error = null;
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload || action.error?.message || 'Failed to add employee';
      })
      
      

      .addCase(updateExistingEmployee.pending, (state) => {
        state.formLoading = true;
        state.error = null;
      })
      .addCase(updateExistingEmployee.fulfilled, (state, action) => {
        state.formLoading = false;
        state.error = null;

        const updatedEmployee = action.payload;

        
        const mainIndex = state.employees.findIndex(emp => emp.id === Number(updatedEmployee.id));
        if (mainIndex !== -1) {
          state.employees[mainIndex] = updatedEmployee;
        }

        
        const filteredIndex = state.filteredEmployees.findIndex(emp => emp.id === Number(updatedEmployee.id));
        if (filteredIndex !== -1) {
          state.filteredEmployees[filteredIndex] = updatedEmployee;
        }
      })
      .addCase(updateExistingEmployee.rejected, (state, action) => {
        state.formLoading = false;
        state.error = action.payload || action.error?.message || 'Failed to update employee';
      })
      


      
      .addCase(deleteExistingEmployee.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteExistingEmployee.fulfilled, (state, action) => {
        state.deleteLoading = false;
        
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
        state.filteredEmployees = [...state.employees];
        state.error = null;
      })
      .addCase(deleteExistingEmployee.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload || action.error?.message || 'Failed to delete employee';
      });
  }
});

export const { filterEmployees, clearError } = employeeSlice.actions;

export default employeeSlice.reducer;