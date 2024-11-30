import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ company }) {
    const { data, setData, put, errors } = useForm({
        name: company.name || '',
        email: company.email || '',
        address: company.address || '',
        phone: company.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/companies/${company.id}`);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Company
                </h2>
            }
        >
            <Head title="Edit Company" />

            <div className="container w-full mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold mb-6">Edit Company</h1>
                <form onSubmit={submit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Company Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
                            placeholder="Enter company name"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Company Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
                            placeholder="Enter company email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Company Address</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
                            placeholder="Enter company address"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Company Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
                            placeholder="Enter company phone number"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Update Company
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
