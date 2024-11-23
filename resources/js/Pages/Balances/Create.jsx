import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        fund_name: '',
        opening_balance: '',
        current_balance: '',
        fund_utilized: '',
        remaining_balance: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/balances');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add Balance</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Fund Name</label>
                    <input
                        type="text"
                        value={data.fund_name}
                        onChange={(e) => setData('fund_name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.fund_name && (
                        <span className="text-red-500 text-sm">{errors.fund_name}</span>
                    )}
                </div>
                {/* Repeat similar blocks for other fields */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
