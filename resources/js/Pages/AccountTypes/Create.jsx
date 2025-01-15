import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    FaAlignLeft,
    FaArrowLeft,
    FaFileAlt
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
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/account-types');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Account Type
                </h2>
            }
        >
            <Head title="Create Account Type" />

            <div className="container mx-auto px-4 py-8 max-w-3xl">
                {/* Back Button */}
                <Link
                    href="/account-types"
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to Account Types
                </Link>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Account Type Name */}
                        <FormInput label="Account Type Name" required error={errors.name}>
                            <div className="relative">
                                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="Enter account type name"
                                    disabled={processing}
                                />
                            </div>
                        </FormInput>

                        {/* Description */}
                        <FormInput label="Description (Optional)" error={errors.description}>
                            <div className="relative">
                                <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
                                <textarea
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    rows="4"
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        ${errors.description ? 'border-red-300' : 'border-gray-300'}`}
                                    placeholder="Enter description of this account type"
                                    disabled={processing}
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Add details about what this account type is used for and any specific rules or requirements.
                            </p>
                        </FormInput>

                        {/* Form Buttons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Link
                                href="/account-types"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creating...' : 'Create Account Type'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Help Card */}
                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                        Tips for Creating Account Types
                    </h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Use clear, descriptive names for account types</li>
                        <li>• Include any specific requirements or restrictions in the description</li>
                        <li>• Specify any applicable regulations or policies</li>
                        <li>• Consider adding information about typical use cases</li>
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
