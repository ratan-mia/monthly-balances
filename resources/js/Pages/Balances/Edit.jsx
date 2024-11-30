import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Edit({ balance, companies, banks, users, accountTypes }) {
    const { data, setData, put, errors } = useForm({
        opening_balance: balance.opening_balance || '',
        inflows: balance.inflows || '',
        outflows: balance.outflows || '',
        account_type_id: balance.account_type_id || '',
        account_number: balance.account_number || '',
        user_id: balance.user_id || '',
        bank_id: balance.bank_id || '',
        company_id: balance.company_id || '',
    });

    useEffect(() => {
        // This effect makes sure the form is populated with the initial values
        setData({
            opening_balance: balance.opening_balance,
            inflows: balance.inflows,
            outflows: balance.outflows,
            account_type_id: balance.account_type_id,
            account_number: balance.account_number,
            user_id: balance.user_id,
            bank_id: balance.bank_id,
            company_id: balance.company_id,
        });
    }, [balance]);

    const submit = (e) => {
        e.preventDefault();
        put(`/balances/${balance.id}`); // PUT request to update the balance data
    };

    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                Edit Balance
            </h2>
        }
    >
        <Head title="Profile" />

        <div className="container w-full mx-auto px-4 py-8">
            {/* <h1 className="text-2xl font-bold mb-6">Edit Balance</h1> */}
            <form onSubmit={submit} className="space-y-4">
                {/* Company Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Company</label>
                    <select
                        value={data.company_id}
                        onChange={(e) => setData('company_id', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>Select a company</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    {errors.company_id && <span className="text-red-500 text-sm">{errors.company_id}</span>}
                </div>

                {/* Responsible Person Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Responsible Person</label>
                    <select
                        value={data.user_id}
                        onChange={(e) => setData('user_id', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>Select a responsible person</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    {errors.user_id && <span className="text-red-500 text-sm">{errors.user_id}</span>}
                </div>

                {/* Bank Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Bank</label>
                    <select
                        value={data.bank_id}
                        onChange={(e) => setData('bank_id', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>Select a bank</option>
                        {banks.map((bank) => (
                            <option key={bank.id} value={bank.id}>
                                {bank.name}
                            </option>
                        ))}
                    </select>
                    {errors.bank_id && <span className="text-red-500 text-sm">{errors.bank_id}</span>}
                </div>

                {/* Account Type Selection */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Account Type</label>
                    <select
                        value={data.account_type_id}
                        onChange={(e) => setData('account_type_id', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    >
                        <option value="" disabled>Select account type</option>
                        {accountTypes.map((accountType) => (
                            <option key={accountType.id} value={accountType.id}>
                                {accountType.name}
                            </option>
                        ))}
                    </select>
                    {errors.account_type_id && <span className="text-red-500 text-sm">{errors.account_type_id}</span>}
                </div>

                {/* Opening Balance */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Opening Balance</label>
                    <input
                        type="number"
                        value={data.opening_balance}
                        onChange={(e) => setData('opening_balance', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.opening_balance && <span className="text-red-500 text-sm">{errors.opening_balance}</span>}
                </div>

                {/* Inflows */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Inflows</label>
                    <input
                        type="number"
                        value={data.inflows}
                        onChange={(e) => setData('inflows', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.inflows && <span className="text-red-500 text-sm">{errors.inflows}</span>}
                </div>

                {/* Outflows */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Outflows</label>
                    <input
                        type="number"
                        value={data.outflows}
                        onChange={(e) => setData('outflows', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.outflows && <span className="text-red-500 text-sm">{errors.outflows}</span>}
                </div>

                {/* Account Number */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Account Number</label>
                    <input
                        type="text"
                        value={data.account_number}
                        onChange={(e) => setData('account_number', e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-1 focus:ring focus:ring-blue-200"
                    />
                    {errors.account_number && <span className="text-red-500 text-sm">{errors.account_number}</span>}
                </div>

                {/* Submit Button */}
                <div>
                <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                    >
                      Update Balance
                    </button>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>

    );
}
