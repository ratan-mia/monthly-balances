import { Link } from '@inertiajs/react';

export default function Index({ balances }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Balances</h1>
            <Link
                href="/balances/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Add Balance
            </Link>
            <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Fund Name</th>
                        <th className="px-4 py-2 border">Opening Balance</th>
                        <th className="px-4 py-2 border">Current Balance</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.map((balance) => (
                        <tr key={balance.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">{balance.fund_name}</td>
                            <td className="px-4 py-2 border">{balance.opening_balance}</td>
                            <td className="px-4 py-2 border">{balance.current_balance}</td>
                            <td className="px-4 py-2 border">
                                <Link
                                    href={`/balances/${balance.id}/edit`}
                                    className="text-yellow-500 hover:underline mr-2"
                                >
                                    Edit
                                </Link>
                                <form
                                    method="POST"
                                    action={`/balances/${balance.id}`}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (confirm('Are you sure you want to delete this?')) {
                                            e.target.submit();
                                        }
                                    }}
                                >
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <button
                                        type="submit"
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
