import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';

export default function Index({ banks }) {
    const deleteBank = (id) => {
        if (confirm('Are you sure you want to delete this bank?')) {
            Inertia.delete(`/banks/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Banks
                </h2>
            }
        >
            <Head title="Banks" />

            <div className="container w-full mx-auto px-6 py-8">
                {/* Header and Add New Bank Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Banks</h1>
                    <div className="text-right">
                        <Link
                            href="/banks/create"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Add New Bank
                        </Link>
                    </div>
                </div>

                {/* Banks Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Branch</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Account Number</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Address</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Contact Number</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.map((bank) => (
                                <tr key={bank.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{bank.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{bank.branch}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{bank.account_number}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{bank.address}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{bank.contact_number}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        {/* View Button */}
                                        <Link
                                            href={`/banks/${bank.id}`}
                                            className="text-green-600 hover:text-green-700 font-medium transition-all"
                                        >
                                            View
                                        </Link>
                                        {/* Edit Button */}
                                        <Link
                                            href={`/banks/${bank.id}/edit`}
                                            className="text-blue-600 hover:text-blue-700 font-medium transition-all"
                                        >
                                            Edit
                                        </Link>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteBank(bank.id)}
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
