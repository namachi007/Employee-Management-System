import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    employees: employeeReducer,
  },
});

export default store;