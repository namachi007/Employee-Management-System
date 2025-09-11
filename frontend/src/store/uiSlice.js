import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false,
  isFormOpen: false,
  isConfirmModalOpen: false,
  editingEmployee: null,
  employeeToDelete: null,
  searchTerm: '',
  notification: {
    show: false,
    message: '',
    type: ''
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openEmployeeForm: (state, action) => {
      state.isFormOpen = true;
      state.editingEmployee = action.payload || null;
    },
    closeEmployeeForm: (state) => {
      state.isFormOpen = false;
      state.editingEmployee = null;
    },
    openConfirmModal: (state, action) => {
      state.isConfirmModalOpen = true;
      state.employeeToDelete = action.payload;
    },
    closeConfirmModal: (state) => {
      state.isConfirmModalOpen = false;
      state.employeeToDelete = null;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'success'
      };
    },
    hideNotification: (state) => {
      state.notification = {
        show: false,
        message: '',
        type: ''
      };
    }
  }
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  openEmployeeForm,
  closeEmployeeForm,
  openConfirmModal,
  closeConfirmModal,
  setSearchTerm,
  showNotification,
  hideNotification
} = uiSlice.actions;

export default uiSlice.reducer;