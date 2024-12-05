// resources/js/Pages/Welcome.jsx
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";

export default function Login() {
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
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
            {/* Banner Section */}
            <div className="w-full md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center md:px-16">
                <h1 className="text-4xl font-bold mb-4 text-center md:text-left">
                    Welcome to Loan Management System
                </h1>
                <p className="text-lg mb-6 text-center md:text-left">
                    Manage loans, track balances, and streamline your financial
                    processes all in one platform.
                </p>
                <ul className="list-disc pl-6 text-lg text-center md:text-left">
                    <li>Track loan amounts and payments</li>
                    <li>Analyze loan performance</li>
                    <li>Generate reports and insights</li>
                </ul>
            </div>

            {/* Login Form Section */}
            <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center md:px-16">
                <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
                    Login to Your Account
                </h2>

                <form onSubmit={submit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Remember Me */}
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData("remember", e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-700">
                            Remember me
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {processing ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>

                {/* Forgot Password Link */}
                <div className="text-center">
                    <a
                        href="#"
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    );
}
