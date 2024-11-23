import { useForm } from '@inertiajs/react';

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Company</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Address</label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Update
                </button>
            </form>
        </div>
    );
}
