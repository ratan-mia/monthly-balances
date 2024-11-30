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

            <div className="container w-full mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Account Types</h1>
                    {/* Create Account Type Button */}
                    <div className="text-right">
                        <Link
                            href={route('account-types.create')}
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Create Account Type
                        </Link>
                    </div>
                </div>

                {/* Account Types Table */}
                <div className="overflow-x-auto bg-white rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Description</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountTypes.map((accountType) => (
                                <tr key={accountType.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{accountType.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{accountType.description || 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        <Link
                                            href={route('account-types.edit', accountType.id)}
                                            className="text-yellow-600 hover:text-yellow-700 font-medium transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteAccountType(accountType.id)}
                                            className="text-red-600 hover:text-red-700 font-medium transition-all"
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
