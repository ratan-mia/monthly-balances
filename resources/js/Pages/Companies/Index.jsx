import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ companies }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Companies
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="container w-full mx-auto px-6 py-8">
                <h1 className="text-3xl font-semibold text-gray-800">Companies</h1>

                {/* Create Company Button aligned to the right */}
                <div className="text-right">
                    <Link
                        href="/companies/create"
                        className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    >
                        Create Company
                    </Link>
                </div>

                {/* Companies Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Address</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companies.map((company) => (
                                <tr key={company.id} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-700">{company.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{company.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{company.address}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{company.phone}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700 space-x-4">
                                        <Link
                                            href={`/companies/${company.id}`}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-all"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/companies/${company.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-800 font-medium transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => confirm('Are you sure you want to delete this?')}
                                            className="text-red-600 hover:text-red-800 font-medium transition-all"
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
