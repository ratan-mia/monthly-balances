import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-800">
                    Manage Your Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-8">
                <div className="container mx-auto px-4 space-y-8">
                    {/* Update Profile Information */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.01]">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Update Profile Information
                            </h3>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-lg"
                                labelClassName="text-gray-800"
                                inputClassName="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Update Password */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.01]">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                Change Password
                            </h3>
                            <UpdatePasswordForm
                                className="max-w-lg"
                                labelClassName="text-gray-800"
                                inputClassName="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Delete Account */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-[1.01]">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-red-600 mb-4">
                                Delete Account
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Permanently delete your account. This action cannot be undone.
                            </p>
                            <DeleteUserForm
                                className="max-w-lg"
                                labelClassName="text-gray-800"
                                inputClassName="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
