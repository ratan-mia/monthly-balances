import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FaArrowLeft,
    FaBuilding,
    FaCreditCard,
    FaMapMarkerAlt,
    FaPhoneAlt
} from 'react-icons/fa';

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

export default function Edit({ bank }) {
    const { data, setData, put, processing, errors } = useForm({
        name: bank.name || '',
        branch: bank.branch || '',
        account_number: bank.account_number || '',
        address: bank.address || '',
        contact_number: bank.contact_number || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/banks/${bank.id}`);
    };

    const handlePhoneInput = (value) => {
        // Remove all non-numeric characters
        const numericalValue = value.replace(/\D/g, '');

        // Format the phone number as XXX-XXX-XXXX
        let formattedValue = numericalValue;
        if (numericalValue.length >= 3) {
            formattedValue = numericalValue.slice(0, 3) + '-' + numericalValue.slice(3);
        }
        if (numericalValue.length >= 6) {
            formattedValue = formattedValue.slice(0, 7) + '-' + formattedValue.slice(7);
        }
        // Limit to 12 characters (XXX-XXX-XXXX)
        formattedValue = formattedValue.slice(0, 12);

        setData('contact_number', formattedValue);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit Bank
                </h2>
            }
        >
            <Head title="Edit Bank" />

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Back Button */}
                <Link
                    href="/banks"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Banks
                </Link>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Bank Details Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <FormInput label="Bank Name" required error={errors.name}>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Enter bank name"
                                        autoComplete="organization"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>

                            {/* Branch Field */}
                            <FormInput label="Branch" error={errors.branch}>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.branch}
                                        onChange={e => setData('branch', e.target.value)}
                                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter branch name"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>
                        </div>

                        {/* Account Number Field */}
                        <FormInput label="Account Number" required error={errors.account_number}>
                            <div className="relative">
                                <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={data.account_number}
                                    onChange={e => setData('account_number', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        ${errors.account_number ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="Enter account number"
                                    autoComplete="off"
                                    disabled={processing}
                                />
                            </div>
                        </FormInput>

                        {/* Address Field */}
                        <FormInput label="Address" error={errors.address}>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter bank address"
                                    rows="3"
                                    disabled={processing}
                                />
                            </div>
                        </FormInput>

                        {/* Contact Number Field */}
                        <FormInput label="Contact Number" error={errors.contact_number}>
                            <div className="relative">
                                <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={data.contact_number}
                                    onChange={e => handlePhoneInput(e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="XXX-XXX-XXXX"
                                    disabled={processing}
                                />
                            </div>
                        </FormInput>

                        {/* Form Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Link
                                href="/banks"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Saving Changes...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
