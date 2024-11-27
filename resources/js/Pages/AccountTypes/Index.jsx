import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';

export default function Index({ accountTypes }) {

    const deleteAccountType = (id) => {
        if (confirm('Are you sure you want to delete this account type?')) {
            Inertia.delete(`/account-types/${id}`);
        }
    };

    return (

        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Account Types
            </h2>
        }
    >
        <Head title="Account Types" />


        <div className="container mx-auto max-w-7xl py-6 px-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Account Types</h1>
                <Link
                    href={route('account-types.create')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition"
                >
                    Create Account Type
                </Link>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Name</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Description</th>
                            <th className="py-3 px-6 text-left text-gray-600 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountTypes.map((accountType) => (
                            <tr key={accountType.id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-6">{accountType.name}</td>
                                <td className="py-4 px-6">{accountType.description || 'N/A'}</td>
                                <td className="py-4 px-6 flex space-x-4">
                                    <Link
                                        href={route('account-types.edit', accountType.id)}
                                        className="text-yellow-500 hover:text-yellow-600 transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteAccountType(accountType.id)}
                                        className="text-red-600 hover:text-red-700 transition"
                                    >
                                        Delete
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
}


