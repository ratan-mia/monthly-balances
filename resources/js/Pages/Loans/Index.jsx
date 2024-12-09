// resources/js/Pages/Loans/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import 'iconify-icon';


export default function Index({ loans,total_loans,total_limit,total_available_balance }) {
    const deleteLoan = (id) => {
        if (confirm('Are you sure you want to delete this loan?')) {
            Inertia.delete(`/loans/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Loans
                </h2>
            }
        >
            <Head title="Loans" />

            <div className="container w-full mx-auto px-6 py-8">
                {/* Header and Add New Loan Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Loans</h1>
                    <div className="text-right">
                        <Link
                            href="/loans/create"
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Add New Loan
                        </Link>
                    </div>
                </div>

                {/* Loans Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Loan ID</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Company</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">User</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Bank</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Loan Type</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Limit</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Occupied Balance </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Available Balance</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.id}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.company.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.user.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.bank.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.loan_type.name}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.limit}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.occupied_balance}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{loan.available_balance}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        {/* View Button */}
                                        <Link
                                            href={`/loans/${loan.id}`}
                                            className="text-green-600 hover:text-green-700 font-medium transition-all"
                                        >
                                           <iconify-icon icon="iconamoon:eye-light"></iconify-icon>
                                        </Link>
                                        {/* Edit Button */}
                                        <Link
                                            href={`/loans/${loan.id}/edit`}
                                            className="text-blue-600 hover:text-blue-700 font-medium transition-all"
                                        >
                                           <iconify-icon icon="lucide:edit"></iconify-icon>
                                        </Link>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteLoan(loan.id)}
                                            className="text-red-600 hover:text-red-700 font-medium transition-all"
                                        >
                                          <iconify-icon icon="mingcute:delete-2-line"></iconify-icon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                              {/* Totals Row */}
                              <tfoot>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-blue-600 text-right font-semibold" colSpan="5">
                                    Totals:
                                </td>
                                <td className="px-4 py-2 border font-semibold">{total_limit}</td>
                                <td className="px-4 py-2 border font-semibold">{total_loans}</td>
                                <td className="px-4 py-2 border font-semibold">{total_available_balance}</td>
                                <td className="px-4 py-2 border"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
