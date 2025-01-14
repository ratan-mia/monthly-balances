import { FaExclamationTriangle, FaUserAltSlash } from 'react-icons/fa';

const DeleteUserModal = ({ isOpen, onClose, onConfirm, userName = 'this user' }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-user-modal"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity backdrop-blur-sm"
                    aria-hidden="true"
                    onClick={onClose}
                />

                {/* Modal panel */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            {/* Warning Icon */}
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <FaExclamationTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>

                            {/* Modal Content */}
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="delete-user-modal"
                                >
                                    Delete User Account
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete the account for{' '}
                                        <span className="font-medium text-gray-700">{userName}</span>?
                                        This action cannot be undone.
                                    </p>
                                </div>

                                {/* Warning Details */}
                                <div className="mt-4 bg-red-50 rounded-md p-4">
                                    <div className="flex items-center text-sm text-red-600">
                                        <FaUserAltSlash className="mr-2" />
                                        <span className="font-medium">Warning:</span>
                                    </div>
                                    <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                                        <li>All user data will be permanently deleted</li>
                                        <li>User's access to the system will be immediately revoked</li>
                                        <li>All associated records will be unlinked</li>
                                        <li>This action cannot be reversed</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                bg-red-600 text-base font-medium text-white hover:bg-red-700
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                                sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Delete Account
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300
                                shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700
                                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
