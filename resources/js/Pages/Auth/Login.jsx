// resources/js/Pages/Welcome.jsx
import { useForm, Head } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { useState } from 'react';
import {
    FaEnvelope,
    FaLock,
    FaSignInAlt,
    FaChartLine,
    FaClipboardCheck,
    FaChartBar,
    FaQuestionCircle
} from 'react-icons/fa';

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Welcome - Loan Management System" />
            <div className="min-h-screen flex flex-col md:flex-row">
                {/* Banner Section */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 flex flex-col justify-center md:px-16 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold mb-6 text-center md:text-left">
                            Loan Management System
                        </h1>
                        <p className="text-xl mb-8 text-blue-100 text-center md:text-left">
                            Your comprehensive solution for financial process management
                        </p>

                        {/* Feature Cards */}
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                                <FaChartLine className="w-6 h-6 mt-1 text-blue-200" />
                                <div>
                                    <h3 className="font-semibold">Track & Monitor</h3>
                                    <p className="text-blue-100">Real-time tracking of loan amounts and payment schedules</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                                <FaClipboardCheck className="w-6 h-6 mt-1 text-blue-200" />
                                <div>
                                    <h3 className="font-semibold">Streamlined Process</h3>
                                    <p className="text-blue-100">Efficient loan management and approval workflows</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm">
                                <FaChartBar className="w-6 h-6 mt-1 text-blue-200" />
                                <div>
                                    <h3 className="font-semibold">Analytics & Reports</h3>
                                    <p className="text-blue-100">Comprehensive reporting and performance analysis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Login Form Section */}
                <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center md:px-16">
                    <div className="max-w-md mx-auto w-full">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">
                            Welcome Back
                        </h2>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 px-3 flex items-center"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData("remember", e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>

                                    href={route('password.request')}
                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center"
                                >
                                    <FaQuestionCircle className="mr-1" />
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                <FaSignInAlt className={`mr-2 ${processing ? 'animate-spin' : ''}`} />
                                {processing ? "Signing in..." : "Sign in"}
                            </button>
                        </form>

                        {/* Additional Info */}
                        <p className="mt-6 text-center text-sm text-gray-500">
                            Contact your administrator for account access
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
