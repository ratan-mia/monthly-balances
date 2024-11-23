import { Link } from '@inertiajs/react';

export default function Show({ balance }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Balance Details</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="px-4 py-2 font-semibold border border-gray-200">Fund Name</td>
                            <td className="px-4 py-2 border border-gray-200">{balance.fund_name}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-semibold border border-gray-200">Opening Balance</td>
                            <td className="px-4 py-2 border border-gray-200">{balance.opening_balance}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="px-4 py-2 font-semibold border border-gray-200">Current Balance</td>
                            <td className="px-4 py-2 border border-gray-200">{balance.current_balance}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-semibold border border-gray-200">Fund Utilized</td>
                            <td className="px-4 py-2 border border-gray-200">{balance.fund_utilized}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="px-4 py-2 font-semibold border border-gray-200">Remaining Balance</td>
                            <td className="px-4 py-2 border border-gray-200">{balance.remaining_balance}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border">Bank Name</td>
                            <td className="px-4 py-2 border">{balance.bank_name}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 border">Responsible Person</td>
                            <td className="px-4 py-2 border">{balance.responsible_person}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <Link
                href="/balances"
                className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Back to List
            </Link>
        </div>
    );
}
