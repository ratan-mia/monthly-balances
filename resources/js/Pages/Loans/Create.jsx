// resources/js/Pages/Loans/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';

export default function Create({ companies, users, banks, loanTypes }) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        user_id: '',
        bank_id: '',
        type: '',
        limit: '',
        occupied_balance: '',
        available_balance: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/loans', { onSuccess: () => window.location.href = '/loans' });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Loan
                </h2>
            }
        >
            <div className="container w-full mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Create New Loan</h1>
                    <div className="text-right">
                        <Link
                            href="/loans"
                            className="inline-block bg-transparent text-gray-600 text-sm font-medium px-3 py-1.5 border border-gray-600 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300"
                        >
                            Back to Loans
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        {/* Company Field */}
                        <div>
                            <label htmlFor="company_id" className="block text-sm font-medium text-gray-700">Company</label>
                            <select
                                id="company_id"
                                name="company_id"
                                value={data.company_id}
                                onChange={(e) => setData('company_id', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Company</option>
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>{company.name}</option>
                                ))}
                            </select>
                            {errors.company_id && <p className="text-red-500 text-sm">{errors.company_id}</p>}
                        </div>

                        {/* User Field */}
                        <div>
                            <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">User</label>
                            <select
                                id="user_id"
                                name="user_id"
                                value={data.user_id}
                                onChange={(e) => setData('user_id', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))}
                            </select>
                            {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                        </div>

                        {/* Bank Field */}
                        <div>
                            <label htmlFor="bank_id" className="block text-sm font-medium text-gray-700">Bank</label>
                            <select
                                id="bank_id"
                                name="bank_id"
                                value={data.bank_id}
                                onChange={(e) => setData('bank_id', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Bank</option>
                                {banks.map((bank) => (
                                    <option key={bank.id} value={bank.id}>{bank.name}</option>
                                ))}
                            </select>
                            {errors.bank_id && <p className="text-red-500 text-sm">{errors.bank_id}</p>}
                        </div>

                            {/* Loan Type */}
                            <div>
                            <label htmlFor="loan_type_id" className="block text-sm font-medium text-gray-700">Loan Type</label>
                            <select
                                id="loan_type_id"
                                name="loan_type_id"
                                value={data.loan_type_id}
                                onChange={(e) => setData('loan_type_id', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Loan Type</option>
                                {loanTypes.map((loantype) => (
                                    <option key={loantype.id} value={loantype.id}>{loantype.name}</option>
                                ))}
                            </select>
                            {errors.loan_type_id && <p className="text-red-500 text-sm">{errors.loan_type_id}</p>}
                        </div>

                        {/* Loan Type Field */}
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Loan Type</label>
                            <input
                                type="text"
                                name="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            />
                            {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>

                        {/* Limit Field */}
                        <div>
                            <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Limit</label>
                            <input
                                type="number"
                                name="limit"
                                value={data.limit}
                                onChange={(e) => setData('limit', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            />
                            {errors.limit && <p className="text-red-500 text-sm">{errors.limit}</p>}
                        </div>

                        {/* Available Balance Field */}
                        {/* <div>
                            <label htmlFor="available_balance" className="block text-sm font-medium text-gray-700">Available Balance</label>
                            <input
                                type="number"
                                name="available_balance"
                                value={data.available_balance}
                                onChange={(e) => setData('available_balance', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            />
                            {errors.available_balance && <p className="text-red-500 text-sm">{errors.available_balance}</p>}
                        </div> */}

                        {/* Occupied Balance Field */}
                        <div>
                            <label htmlFor="occupied_balance" className="block text-sm font-medium text-gray-700">Occupied Balance</label>
                            <input
                                type="number"
                                name="occupied_balance"
                                value={data.occupied_balance}
                                onChange={(e) => setData('occupied_balance', e.target.value)}
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                            />
                            {errors.occupied_balance && <p className="text-red-500 text-sm">{errors.occupied_balance}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Loan
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
