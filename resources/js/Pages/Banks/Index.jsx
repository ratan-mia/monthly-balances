import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

export default function Index({ banks }) {
    const deleteBank = (id) => {
        if (confirm('Are you sure you want to delete this bank?')) {
            Inertia.delete(`/banks/${id}`);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Banks</h1>
            <a
                href="/banks/create"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4 inline-block"
            >
                Add New Bank
            </a>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Branch</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Contact Number</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {banks.map((bank) => (
                        <tr key={bank.id}>
                            <td className="border px-4 py-2">{bank.name}</td>
                            <td className="border px-4 py-2">{bank.branch}</td>
                            <td className="border px-4 py-2">{bank.address}</td>
                            <td className="border px-4 py-2">{bank.contact_number}</td>
                            <td className="border px-4 py-2">
                            <Link
                                    href={`/banks/${bank.id}`}
                                    className="text-green-500 hover:underline mr-2"
                                >
                                    View
                                </Link>
                                <a
                                    href={`/banks/${bank.id}/edit`}
                                    className="text-blue-500 mr-2"
                                >
                                    Edit
                                </a>
                                <button
                                    onClick={() => deleteBank(bank.id)}
                                    className="text-red-500"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
