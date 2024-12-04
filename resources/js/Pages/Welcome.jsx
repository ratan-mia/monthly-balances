// resources/js/Pages/Welcome.jsx
import InputError from "@/Components/InputError";
import { Head, useForm } from "@inertiajs/react";
export default function Welcome() {
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
            <div className="w-full md:w-1/2 bg-blue-600 text-white p-10 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to Loan Management System
                </h1>
                <p className="text-lg mb-6">
                    Manage loans, track balances, and streamline your financial
                    processes all in one platform.
                </p>
                <ul className="list-disc pl-6 text-lg">
                    <li>Track loan amounts and payments</li>
                    <li>Analyze loan performance</li>
                    <li>Generate reports and insights</li>
                </ul>
            </div>

            {/* Login Form Section */}
            <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center shadow-xl">
                <Head title="Login" />
                <h2 className="text-3xl font-semibold text-center mb-6">
                    Login to Your Account
                </h2>

                <form onSubmit={submit}>
                    {/* Email */}
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 font-medium"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 font-medium"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a
                        href="/register"
                        className="text-blue-600 hover:text-blue-700"
                    >
                        Don't have an account? Register
                    </a>
                </div>
            </div>
        </div>
    );
}
