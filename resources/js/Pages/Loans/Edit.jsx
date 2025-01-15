import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import {
    FaArrowLeft,
    FaBuilding,
    FaCalculator,
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

const FormInput = ({ label, error, required = false, children }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && (
            <p className="mt-1 text-sm text-red-600" role="alert">
                {error}
            </p>
        )}
    </div>
);

export default function Edit({ loan, companies, users, banks, loanTypes }) {
    const { data, setData, put, processing, errors } = useForm({
        company_id: loan.company_id || '',
        user_id: loan.user_id || '',
        bank_id: loan.bank_id || '',
        loan_type_id: loan.loan_type_id || '',
        limit: loan.limit?.toString() || '',
        occupied_balance: loan.occupied_balance?.toString() || '0',
        available_balance: loan.available_balance?.toString() || '0',
    });

    const [calculatedAvailableBalance, setCalculatedAvailableBalance] = useState(0);

    useEffect(() => {
        // Calculate available balance whenever limit or occupied balance changes
        const limit = parseFloat(data.limit) || 0;
        const occupied = parseFloat(data.occupied_balance) || 0;
        const available = limit - occupied;
        setCalculatedAvailableBalance(available);
        setData('available_balance', available.toString());
    }, [data.limit, data.occupied_balance]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/loans/${loan.id}`);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
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
                    Edit Loan
                </h2>
            }
        >
            <Head title="Edit Loan" />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/loans"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Loans
                </Link>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information Section */}
                    <FormSection title="Basic Information">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Company" required error={errors.company_id}>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.company_id}
                                        onChange={e => setData('company_id', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.company_id ? 'border-red-300' : 'border-gray-300'}`}
                                        disabled={processing}
                                    >
                                        <option value="">Select Company</option>
                                        {companies.map(company => (
                                            <option key={company.id} value={company.id}>
                                                {company.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>

                            <FormInput label="Responsible User" required error={errors.user_id}>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.user_id}
                                        onChange={e => setData('user_id', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.user_id ? 'border-red-300' : 'border-gray-300'}`}
                                        disabled={processing}
                                    >
                                        <option value="">Select User</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>
                        </div>
                    </FormSection>

                    {/* Loan Details Section */}
                    <FormSection title="Loan Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Bank" required error={errors.bank_id}>
                                <div className="relative">
                                    <FaUniversity className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.bank_id}
                                        onChange={e => setData('bank_id', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.bank_id ? 'border-red-300' : 'border-gray-300'}`}
                                        disabled={processing}
                                    >
                                        <option value="">Select Bank</option>
                                        {banks.map(bank => (
                                            <option key={bank.id} value={bank.id}>
                                                {bank.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>

                            <FormInput label="Loan Type" required error={errors.loan_type_id}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                                    <select
                                        value={data.loan_type_id}
                                        onChange={e => setData('loan_type_id', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.loan_type_id ? 'border-red-300' : 'border-gray-300'}`}
                                        disabled={processing}
                                    >
                                        <option value="">Select Loan Type</option>
                                        {loanTypes.map(type => (
                                            <option key={type.id} value={type.id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </FormInput>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormInput label="Loan Limit" required error={errors.limit}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.limit}
                                        onChange={e => handleNumberInput('limit', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.limit ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Enter loan limit"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>

                            <FormInput label="Occupied Balance" required error={errors.occupied_balance}>
                                <div className="relative">
                                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.occupied_balance}
                                        onChange={e => handleNumberInput('occupied_balance', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.occupied_balance ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Enter occupied balance"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>
                        </div>

                        {/* Available Balance Display */}
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FaCalculator className="text-gray-400 mr-2" />
                                    <span className="text-gray-600">Available Balance:</span>
                                </div>
                                <span className={`text-lg font-semibold ${calculatedAvailableBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatCurrency(calculatedAvailableBalance)}
                                </span>
                            </div>
                        </div>
                    </FormSection>

                    {/* Form Buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <Link
                            href="/loans"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
