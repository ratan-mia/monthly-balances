import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

export default function Edit({ accountType }) {
    const [form, setForm] = useState({
        name: accountType.name || '',
        description: accountType.description || '',
    });

    useEffect(() => {
        // Update form data if accountType props change
        setForm({
            name: accountType.name || '',
            description: accountType.description || '',
        });
    }, [accountType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/account-types/${accountType.id}`, form);  // PUT request for updating
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Edit Account Type</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Type Name Field */}
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Account Type Description Field */}
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
                        Description (optional)
                    </label>
                    <textarea
                        id="description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
