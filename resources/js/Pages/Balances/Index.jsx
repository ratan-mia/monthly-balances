import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';

export default function Index({ balances, total_inflows, total_outflows, total_closing_balance }) {

    const deleteBalance = (id) => {
        if (confirm('Are you sure you want to delete this balance?')) {
            Inertia.delete(`/balances/${id}`);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Balances
                </h2>
            }
        >
            <Head title="Balances" />

            <div className="container w-full mx-auto px-6 py-8">
                {/* Create Balance Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Balances</h1>
                    <div className="text-right">
                        <Link
                            href="/balances/create"
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-3000"
                        >
                            Add Balance
                        </Link>
                    </div>
                </div>

                {/* Balances Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">User Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Company</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Bank</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Account Type</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Account Number</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Opening Balance</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Inflows</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Outflows</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Closing Balance</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balances.map((balance) => (
                                <tr key={balance.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.user ? balance.user.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.company ? balance.company.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.bank ? balance.bank.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.account_type ? balance.account_type.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.account_number || 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.opening_balance || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.inflows || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.outflows || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.closing_balance || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        {/* View Button */}
                                        <Link
                                            href={`/balances/${balance.id}`}
                                            className="text-blue-600 hover:text-blue-700 font-medium transition-all"
                                        >
                                            View
                                        </Link>
                                        {/* Edit Button */}
                                        <Link
                                            href={`/balances/${balance.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-700 font-medium transition-all"
                                        >
                                            Edit
                                        </Link>
                                        {/* Delete Button */}
                                        <button
                                            onClick={() => deleteBalance(balance.id)}
                                            className="text-red-600 hover:text-red-700 font-medium transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Totals Row */}
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-right font-semibold" colSpan="6">
                                    Totals:
                                </td>
                                <td className="px-4 py-2 border font-semibold">{total_inflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_outflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_closing_balance}</td>
                                <td className="px-4 py-2 border"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
