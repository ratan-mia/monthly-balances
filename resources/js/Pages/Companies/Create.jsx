import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FaArrowLeft,
    FaBuilding,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone
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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/companies');
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

        setData('phone', formattedValue);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Company
                </h2>
            }
        >
            <Head title="Create Company" />

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Back Button */}
                <Link
                    href="/companies"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Companies
                </Link>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Name Field */}
                            <FormInput label="Company Name" required error={errors.name}>
                                <div className="relative">
                                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="Enter company name"
                                        autoComplete="organization"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>

                            {/* Email Field */}
                            <FormInput label="Email Address" required error={errors.email}>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                            ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                                        placeholder="company@example.com"
                                        autoComplete="email"
                                        disabled={processing}
                                    />
                                </div>
                            </FormInput>
                        </div>

                        {/* Address Field */}
                        <FormInput label="Address" error={errors.address}>
                            <div className="relative">
                                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter company address"
                                    rows="3"
                                    disabled={processing}
                                />
                            </div>
                        </FormInput>

                        {/* Phone Field */}
                        <FormInput label="Phone Number" error={errors.phone}>
                            <div className="relative">
                                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={data.phone}
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
                                href="/companies"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creating...' : 'Create Company'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
