// resources/js/Pages/Loans/Show.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ loan }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Loan Details
                </h2>
            }
        >
            <Head title={`Loan #${loan.id}`} />

            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Loan Details</h1>
                    <div className="text-right">
                        <Link
                            href="/loans"
                            className="inline-block bg-transparent text-gray-600 text-sm font-medium px-3 py-1.5 border border-gray-600 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
                        >
                            Back to Loans
                        </Link>
                    </div>
                </div>

                {/* Loan Information */}
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Loan ID:</span>
                        <span>{loan.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Company:</span>
                        <span>{loan.company.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">User:</span>
                        <span>{loan.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Bank:</span>
                        <span>{loan.bank.name}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Type:</span>
                        <span>{loan.type}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Limit:</span>
                        <span>{loan.limit}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Available Balance:</span>
                        <span>{loan.available_balance}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Occupied Balance:</span>
                        <span>{loan.occupied_balance}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-4">
                    {/* Edit Button */}
                    <Link
                        href={`/loans/${loan.id}/edit`}
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
                    >
                        Edit
                    </Link>

                    {/* Delete Button */}
                    <form
                        method="POST"
                        action={`/loans/${loan.id}`}
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (confirm('Are you sure you want to delete this loan?')) {
                                e.target.submit();
                            }
                        }}
                    >
                        <button
                            type="submit"
                            className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
