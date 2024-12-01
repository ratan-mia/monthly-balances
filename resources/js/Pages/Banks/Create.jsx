import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Create() {
    const [form, setForm] = useState({
        name: '',
        branch: '',
        account_number: '',
        address: '',
        contact_number: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post('/banks', form);
    };

    return (

        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Banks
            </h2>
        }
    >
        <Head title="Banks" />

        <div className="container w-full mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Add New Bank</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name(Required)</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        autoComplete='on'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Branch</label>
                    <input
                        type="text"
                        value={form.branch}
                        onChange={(e) => setForm({ ...form, branch: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Account Number(Required)</label>
                    <input
                        type="text"
                        value={form.account_number}
                        onChange={(e) => setForm({ ...form, account_number: e.target.value })}
                        autoComplete='on'
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>


                <div>
                    <label className="block text-gray-700 font-medium mb-1">Address</label>
                    <input
                        type="text"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Contact Number</label>
                    <input
                        type="text"
                        value={form.contact_number}
                        onChange={(e) => setForm({ ...form, contact_number: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Save
                </button>
            </form>
        </div>
    </AuthenticatedLayout>

    );
}
