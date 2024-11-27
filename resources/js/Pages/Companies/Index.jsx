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

        <div className="container mx-auto max-w-7xl p-4">
            <h1 className="text-2xl font-bold mb-4">Companies</h1>
            <Link
                href="/companies/create"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Create Company
            </Link>
            <table className="table-auto w-full mt-4 border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Address</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.id} className="hover:bg-gray-50 odd:bg-gray-50">
                            <td className="px-4 py-2 border">{company.name}</td>
                            <td className="px-4 py-2 border">{company.email}</td>
                            <td className="px-4 py-2 border">{company.address}</td>
                            <td className="px-4 py-2 border">{company.phone}</td>
                            <td className="px-4 py-2 border">
                                <Link
                                    href={`/companies/${company.id}`}
                                    className="text-blue-500 hover:underline mr-2"
                                >
                                    View
                                </Link>
                                <Link
                                    href={`/companies/${company.id}/edit`}
                                    className="text-yellow-500 hover:underline mr-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => confirm('Are you sure you want to delete this?')}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </AuthenticatedLayout>

    );
}
