import { useForm } from '@inertiajs/react';

export default function Register({ companies }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_ids: [], // Changed from company_id to company_ids array
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Handle multiple select
    const handleCompanyChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setData('company_ids', selectedOptions);
    };

    return (
        <div className="min-h-screen flex flex-wrap">
            {/* Left side: Background Image */}
            <div className="w-full lg:w-1/2 h-screen bg-cover bg-center"
                style={{ backgroundImage: 'url("https://wealthandfinance.digital/wp-content/uploads/2024/09/Untitled-3.jpg")' }}>
            </div>

            {/* Right side: Form */}
            <div className="w-full lg:w-1/2 h-screen flex items-center justify-center bg-white">
                <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-3 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>

                    <form onSubmit={submit}>
                        {/* Name Input */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={data.name}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                        </div>

                        {/* Email Input */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={data.password}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                        </div>

                        {/* Password Confirmation Input */}
                        <div className="mb-6">
                            <label htmlFor="password_confirmation" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation}</span>}
                        </div>

                        {/* Multiple Company Selection */}
                        <div className="mb-6">
                            <label htmlFor="company_ids" className="block text-gray-700 font-medium mb-2">Select Companies</label>
                            <select
                                id="company_ids"
                                name="company_ids"
                                multiple
                                value={data.company_ids}
                                onChange={handleCompanyChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                size="4" // Shows 4 options at once
                            >
                                {companies.map(company => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple companies</p>
                            {errors.company_ids && <span className="text-red-500 text-sm">{errors.company_ids}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="mb-6">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                                disabled={processing}
                            >
                                {processing ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
