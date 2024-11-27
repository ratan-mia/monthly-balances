import { useForm } from '@inertiajs/react';

export default function Create({ companies,banks,users,accountTypes }) {
    const { data, setData, post, errors } = useForm({
        fund_name: '',
        opening_balance: '',
        current_balance: '',
        fund_utilized: '',
        remaining_balance: '',
        bank_name: '',
        company: '',
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
                    <label className="block text-gray-700 font-medium mb-1">Company</label>
                    <select
                        value={data.company}
                        onChange={(e) => setData('company', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>
                            Select a company
                        </option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.name}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    {errors.company && (
                        <span className="text-red-500 text-sm">{errors.company}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Responsible Person</label>
                    <select
                        value={data.responsible_person}
                        onChange={(e) => setData('responsible_person', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>
                            Select a user
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    {errors.user && (
                        <span className="text-red-500 text-sm">{errors.user}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Bank</label>
                    <select
                        value={data.bank}
                        onChange={(e) => setData('bnak', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>
                            Select a bank
                        </option>
                        {banks.map((bank) => (
                            <option key={bank.id} value={bank.name}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                    {errors.bank && (
                        <span className="text-red-500 text-sm">{errors.bank}</span>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Account Type</label>
                    <select
                        value={data.account_type}
                        onChange={(e) => setData('account_type', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>
                            Select an account type
                        </option>
                        {accountTypes.map((accountType) => (
                            <option key={accountType.id} value={accountType.name}>
                                {accountType.name}
                            </option>
                        ))}
                    </select>
                    {errors.account_type && (
                        <span className="text-red-500 text-sm">{errors.account_type}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Account Number</label>
                    <input
                        type="text"
                        value={data.account_number}
                        onChange={(e) => setData('account_number', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.account_number && (
                        <span className="text-red-500 text-sm">{errors.account_number}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Opening Balance</label>
                    <input
                        type="number"
                        value={data.opening_balance}
                        onChange={(e) => setData('opening_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.opening_balance && (
                        <span className="text-red-500 text-sm">{errors.opening_balance}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Inflows</label>
                    <input
                        type="number"
                        value={data.inflows}
                        onChange={(e) => setData('inflows', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.inflows && (
                        <span className="text-red-500 text-sm">{errors.inflows}</span>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Outflows</label>
                    <input
                        type="number"
                        value={data.outflows}
                        onChange={(e) => setData('outflows', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.outflows && (
                        <span className="text-red-500 text-sm">{errors.outflows}</span>
                    )}
                </div>

                {/* <div>
                    <label className="block text-gray-700 font-medium mb-1">Fund Name</label>
                    <input
                        type="text"
                        value={data.fund_name}
                        onChange={(e) => setData('fund_name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.fund_name && (
                        <span className="text-red-500 text-sm">{errors.fund_name}</span>
                    )}
                </div> */}

                {/* <div>
                    <label className="block text-gray-700 font-medium mb-1">Current Balance</label>
                    <input
                        type="number"
                        value={data.current_balance}
                        onChange={(e) => setData('current_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.current_balance && (
                        <span className="text-red-500 text-sm">{errors.current_balance}</span>
                    )}
                </div> */}
                {/* <div>
                    <label className="block text-gray-700 font-medium mb-1">Fund Utilized</label>
                    <input
                        type="number"
                        value={data.fund_utilized}
                        onChange={(e) => setData('fund_utilized', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.fund_utilized && (
                        <span className="text-red-500 text-sm">{errors.fund_utilized}</span>
                    )}
                </div> */}
                {/* <div>
                    <label className="block text-gray-700 font-medium mb-1">Remaining Balance</label>
                    <input
                        type="number"
                        value={data.remaining_balance}
                        onChange={(e) => setData('remaining_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.remaining_balance && (
                        <span className="text-red-500 text-sm">{errors.remaining_balance}</span>
                    )}
                </div> */}
                {/* <div>
                    <label className="block text-gray-700 font-medium mb-1">Bank Name</label>
                    <input
                        type="text"
                        value={data.bank_name}
                        onChange={(e) => setData('bank_name', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.bank_name && (
                        <span className="text-red-500 text-sm">{errors.bank_name}</span>
                    )}
                </div> */}



                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Add Balance
                </button>
            </form>
        </div>
    );
}
