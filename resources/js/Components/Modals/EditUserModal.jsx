import { useEffect, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

const EditUserModal = ({ isOpen, onClose, onConfirm, user, roles }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                role: user.roles.length > 0 ? user.roles[0].name : ''
            });
        }
    }, [user]);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }
        }

        // Role validation
        if (!formData.role) {
            newErrors.role = 'Role is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await onConfirm(formData);
                onClose();
            } catch (error) {
                console.error('Error updating user:', error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-modal"
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
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                {/* Icon */}
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <FaUserEdit className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                </div>

                                {/* Form Content */}
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <h3
                                        className="text-lg leading-6 font-medium text-gray-900"
                                        id="edit-user-modal"
                                    >
                                        Edit User Profile
                                    </h3>
                                    <div className="mt-4 space-y-4">
                                        {/* Name Field */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                                                    ${errors.name
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                    }`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.name && (
                                                <p className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* Email Field */}
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                                                    ${errors.email
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                    }`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
                                            )}
                                        </div>

                                        {/* Role Field */}
                                        <div>
                                            <label
                                                htmlFor="role"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Role
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleInputChange}
                                                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                                                    ${errors.role
                                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                                    }`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select Role</option>
                                                {roles.map((role) => (
                                                    <option key={role.id} value={role.name}>
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.role && (
                                                <p className="mt-1 text-sm text-red-600" role="alert">{errors.role}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                    bg-blue-600 text-base font-medium text-white hover:bg-blue-700
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    sm:ml-3 sm:w-auto sm:text-sm
                                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300
                                    shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700
                                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                                    ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
