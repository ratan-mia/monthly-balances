import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const UserIndex = ({ users, roles }) => {
    const [selectedRoles, setSelectedRoles] = useState({});

    const handleRoleChange = (userId, role) => {
        setSelectedRoles((prevSelectedRoles) => ({
            ...prevSelectedRoles,
            [userId]: role,
        }));
    };

    const handleAssignRole = (userId) => {
        const role = selectedRoles[userId];
        if (role) {
            Inertia.post(`/admin/users/${userId}/assign-role`, { role });
        }
    };

    const handleEdit = (userId) => {
        Inertia.get(`/admin/users/${userId}/edit`);
    };

    const handleRemove = (userId) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            Inertia.delete(`/admin/users/${userId}`);
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
                                        <select
                                            className="bg-gray-100 border border-gray-300 rounded-md p-2 text-sm"
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            value={selectedRoles[user.id] || ''}
                                        >
                                            <option value="">Select Role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.name}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => handleAssignRole(user.id)}
                                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Assign Role
                                        </button>

                                        <button
                                            onClick={() => handleEdit(user.id)}
                                            className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        >
                                            Edit
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
        </AuthenticatedLayout>
    );
};

export default UserIndex;
