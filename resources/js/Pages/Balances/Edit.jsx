import { useForm } from '@inertiajs/react';

export default function Edit({ balance }) {
    const { data, setData, put, errors } = useForm({
        fund_name: balance.fund_name || '',
        opening_balance: balance.opening_balance || '',
        current_balance: balance.current_balance || '',
        fund_utilized: balance.fund_utilized || '',
        remaining_balance: balance.remaining_balance || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/balances/${balance.id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Balance</h1>
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Fund Name</label>
                    <input
                        type="text"
                        value={data.fund_name}
                        onChange={(e) => setData('fund_name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.fund_name && (
                        <span className="text-red-500 text-sm">{errors.fund_name}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Opening Balance</label>
                    <input
                        type="number"
                        value={data.opening_balance}
                        onChange={(e) => setData('opening_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.opening_balance && (
                        <span className="text-red-500 text-sm">{errors.opening_balance}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Current Balance</label>
                    <input
                        type="number"
                        value={data.current_balance}
                        onChange={(e) => setData('current_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.current_balance && (
                        <span className="text-red-500 text-sm">{errors.current_balance}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Fund Utilized</label>
                    <input
                        type="number"
                        value={data.fund_utilized}
                        onChange={(e) => setData('fund_utilized', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.fund_utilized && (
                        <span className="text-red-500 text-sm">{errors.fund_utilized}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Remaining Balance</label>
                    <input
                        type="number"
                        value={data.remaining_balance}
                        onChange={(e) => setData('remaining_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
                    />
                    {errors.remaining_balance && (
                        <span className="text-red-500 text-sm">{errors.remaining_balance}</span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Update Balance
                </button>
            </form>
        </div>
    );
}
