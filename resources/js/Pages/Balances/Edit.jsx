import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    FaArrowLeft,
    FaBuilding,
    FaCreditCard,
    FaMoneyBillWave,
    FaUniversity,
    FaUser
} from 'react-icons/fa';

const FormSection = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const FormInput = ({ label, error, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        {children}
        {error && (
            <p className="mt-1 text-sm text-red-600" role="alert">
                {error}
            </p>
        )}
    </div>
);

export default function Edit({ balance, companies, banks, users, accountTypes }) {
    const { data, setData, put, errors, processing } = useForm({
        opening_balance: balance.opening_balance || '',
        inflows: balance.inflows || '',
        outflows: balance.outflows || '',
        account_type_id: balance.account_type_id || '',
        account_number: balance.account_number || '',
        user_id: balance.user_id || '',
        bank_id: balance.bank_id || '',
        company_id: balance.company_id || '',
    });

    const [calculatedBalance, setCalculatedBalance] = useState(0);

    useEffect(() => {
        // Calculate balance whenever monetary values change
        const opening = parseFloat(data.opening_balance) || 0;
        const inflow = parseFloat(data.inflows) || 0;
        const outflow = parseFloat(data.outflows) || 0;
        setCalculatedBalance(opening + inflow - outflow);
    }, [data.opening_balance, data.inflows, data.outflows]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/balances/${balance.id}`);
    };

    const handleBankChange = (e) => {
        const selectedBankId = e.target.value;
        const selectedBank = banks.find(bank => bank.id == selectedBankId);
        setData({ ...data, bank_id: selectedBankId, account_number: selectedBank?.account_number || '' });
    };

    const handleNumberInput = (field, value) => {
        // Remove any non-numeric characters except decimal point
        const sanitizedValue = value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = sanitizedValue.split('.');
        const finalValue = parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : sanitizedValue;

        setData(field, finalValue);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Balance
                </h2>
            }
        >
            <Head title="Edit Balance" />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/balances"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Balances
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Company and User Section */}
                    <FormSection title="Account Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Company" error={errors.company_id}>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.company_id}
                                        onChange={(e) => setData('company_id', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={processing}
                                    >
                                        <option value="">Select a company</option>
                                        {companies.map((company) => (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>

                            <FormInput label="Responsible Person" error={errors.user_id}>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData('user_id', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={processing}
                                    >
                                        <option value="">Select a responsible person</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>
                        </div>
                    </FormSection>

                    {/* Balance Section */}
                    <FormSection title="Balance Information">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormInput label="Opening Balance" error={errors.opening_balance}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.opening_balance}
                                        onChange={(e) => handleNumberInput('opening_balance', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>

                            <FormInput label="Inflows" error={errors.inflows}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-green-400" />
                                    <input
                                        type="text"
                                        value={data.inflows}
                                        onChange={(e) => handleNumberInput('inflows', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>

                            <FormInput label="Outflows" error={errors.outflows}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-red-400" />
                                    <input
                                        type="text"
                                        value={data.outflows}
                                        onChange={(e) => handleNumberInput('outflows', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="0.00"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>
                        </div>

                        {/* Calculated Balance Display */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Calculated Balance:</span>
                                <span className={`text-lg font-semibold ${calculatedBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {calculatedBalance.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })}
                                </span>
                            </div>
                        </div>
                    </FormSection>

                    {/* Bank Details Section */}
                    <FormSection title="Bank Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormInput label="Account Type" error={errors.account_type_id}>
                                <div className="relative">
                                    <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.account_type_id}
                                        onChange={(e) => setData('account_type_id', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={processing}
                                    >
                                        <option value="">Select account type</option>
                                        {accountTypes.map((accountType) => (
                                            <option key={accountType.id} value={accountType.id}>
                                                {accountType.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>

                            <FormInput label="Bank" error={errors.bank_id}>
                                <div className="relative">
                                    <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.bank_id}
                                        onChange={handleBankChange}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        disabled={processing}
                                    >
                                        <option value="">Select a bank</option>
                                        {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>

                            <FormInput label="Account Number" error={errors.account_number}>
                                <div className="relative">
                                    <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.account_number}
                                        readOnly
                                        className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                                        placeholder="Account number will be auto-filled"
                                    />
                                </div>
                            </FormInput>
                        </div>
                    </FormSection>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                        <Link
                            href="/balances"
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Update Balance'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
