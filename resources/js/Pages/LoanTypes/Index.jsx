// resources/js/Pages/LoanTypes/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ loanTypes }) {
    const deleteLoanType = (id) => {
        if (confirm('Are you sure you want to delete this loan type?')) {
            Inertia.delete(`/loan-types/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Loan Types</h1>
                    <Link
                        href="/loan-types/create"
                        className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition-all"
                    >
                        Add New Loan Type
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Description</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanTypes.map((loanType) => (
                                <tr key={loanType.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{loanType.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loanType.description}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        <Link
                                            href={`/loan-types/${loanType.id}/edit`}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteLoanType(loanType.id)}
                                            className="text-red-600 hover:text-red-700"
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
