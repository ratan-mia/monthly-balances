import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ balances }) {
console.log(balances);
    return (

        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Balances
            </h2>
        }
    >
        <Head title="Profile" />

        <div className="container mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Balances</h1>
            <Link
                href="/balances/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4 inline-block"
            >
                Add Balance
            </Link>
            <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">User Name</th>
                        <th className="px-4 py-2 border">Company</th>
                        <th className="px-4 py-2 border">Bank</th>
                        <th className="px-4 py-2 border">Account Type</th>
                        <th className="px-4 py-2 border">Account Number</th>
                        <th className="px-4 py-2 border">Opening Balance</th>
                        <th className="px-4 py-2 border">Inflows</th>
                        <th className="px-4 py-2 border">Outflows</th>
                        <th className="px-4 py-2 border">Closing Balance</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance) => (
                        <tr key={balance.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{balance.user ? balance.user.name : 'N/A'}</td>
                            <td className="px-4 py-2 border">{balance.company ? balance.company.name : 'N/A'}</td>
                            <td className="px-4 py-2 border">{balance.bank ? balance.bank.name : 'N/A'}</td>
                            <td className="px-4 py-2 border">{balance.account_type ? balance.account_type.name : 'N/A'}</td>
                            <td className="px-4 py-2 border">{balance.account_number || 'N/A'}</td>
                            {/* <td className="px-4 py-2 border">{balance.accountType || 'N/A'}</td> */}
                            <td className="px-4 py-2 border">{balance.opening_balance || '0'}</td>
                            <td className="px-4 py-2 border">{balance.inflows || '0'}</td>
                            <td className="px-4 py-2 border">{balance.outflows || '0'}</td>
                            <td className="px-4 py-2 border">{balance.closing_balance || '0'}</td>
                            <td className="px-4 py-2 border flex gap-2">
                                {/* View Button */}
                                <Link
                                    href={`/balances/${balance.id}`}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                    View
                                </Link>
                                {/* Edit Button */}
                                <Link
                                    href={`/balances/${balance.id}/edit`}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </Link>

                                <Link
                                    href={`/balances/${balance.id}`}
                                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                                >
                                   Show
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </AuthenticatedLayout>

    );
}
