
export default function Show({ bank }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Bank Details</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Name:</h2>
                    <p className="text-gray-700">{bank.name}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Branch:</h2>
                    <p className="text-gray-700">{bank.branch || 'Not available'}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Address:</h2>
                    <p className="text-gray-700">{bank.address || 'Not available'}</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Contact Number:</h2>
                    <p className="text-gray-700">{bank.contact_number || 'Not available'}</p>
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <a
                    href="/banks"
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                >
                    Back to List
                </a>
                <a
                    href={`/banks/${bank.id}/edit`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Edit Bank
                </a>
            </div>
        </div>
    );
}
