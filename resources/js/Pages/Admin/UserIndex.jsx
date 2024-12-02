import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const UserIndex = ({ users, roles }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const [newRole, setNewRole] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);

    // Open the edit profile modal
    const handleEdit = (userId) => {
        const user = users.find((user) => user.id === userId);
        setUserDetails(user);
        setNewRole(user.roles.length > 0 ? user.roles[0].name : ''); // Set the current role
        setSelectedUserId(userId);
        setShowEditModal(true);
    };

    // Update user profile
    const handleUpdateProfile = () => {
        Inertia.put(`/users/${selectedUserId}`, {
            ...userDetails,
            role: newRole, // Pass the selected role to update
        });
        setShowEditModal(false);
    };

    // Remove user
    const handleRemove = (userId) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            Inertia.delete(`/users/${userId}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Manage Users
                </h2>
            }
        >
            <Head title="Manage Users" />

            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">User Management</h1>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
                            {users.map((user) => (
                                <tr key={user.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">
                                        {user.roles.map((role) => role.name).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(user.id)}
                                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit Profile
                                        </button>

                                        <button
                                            onClick={() => handleRemove(user.id)}
                                            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={userDetails.name}
                                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select
                                id="role"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateProfile}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default UserIndex;
