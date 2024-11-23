import { Link } from '@inertiajs/react';

export default function Show({ company }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Company Details</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="px-4 py-2 font-semibold border border-gray-200">Name</td>
                            <td className="px-4 py-2 border border-gray-200">{company.name}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-semibold border border-gray-200">Email</td>
                            <td className="px-4 py-2 border border-gray-200">{company.email}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="px-4 py-2 font-semibold border border-gray-200">Address</td>
                            <td className="px-4 py-2 border border-gray-200">{company.address}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-semibold border border-gray-200">Phone</td>
                            <td className="px-4 py-2 border border-gray-200">{company.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Link
                href="/companies"
                className="inline-block mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Back to List
            </Link>
        </div>
    );
}
