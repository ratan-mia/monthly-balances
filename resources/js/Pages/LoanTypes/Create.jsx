// resources/js/Pages/LoanTypes/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/loan-types');
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create Loan Type</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name(Required)</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                    >
                        Create Loan Type
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
