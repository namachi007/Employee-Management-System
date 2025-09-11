import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { closeConfirmModal } from '../store/uiSlice';

const ConfirmationModal = ({ onConfirm }) => {
  const dispatch = useDispatch();
  const { isConfirmModalOpen, employeeToDelete } = useSelector(state => state.ui);
  const { deleteLoading } = useSelector(state => state.employees);

  const handleClose = () => {
    dispatch(closeConfirmModal());
  };

  if (!isConfirmModalOpen || !employeeToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all">
        {/* --> Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 ml-3">
              Delete Employee
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors duration-200"
            disabled={deleteLoading}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      
        {/* --> Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-gray-800">{employeeToDelete.name}</span>?
          </p>
          <p className="text-sm text-gray-500">
            This action cannot be undone. All information associated with this employee will be permanently removed.
          </p>
        </div>

        {/* --> Action */}
        <div className="flex justify-end space-x-3 p-6 pt-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            disabled={deleteLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleteLoading}
            className="inline-flex items-center px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
          >
            {deleteLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;