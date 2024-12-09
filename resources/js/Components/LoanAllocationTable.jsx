const LoanAllocationTable = ({ loans }) => (
    <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse text-left text-xs text-gray-700">
            <thead className="bg-blue-600 text-white">
                <tr>
                    <th className="px-2 py-2 font-semibold">Bank</th>
                    <th className="px-2 py-2 font-semibold">Total Loans</th>
                    <th className="px-2 py-2 font-semibold">Total Amount</th>
                </tr>
            </thead>
            <tbody>
                {loans.map((loan, index) => (
                    <tr
                        key={index}
                        className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                        <td className="px-4 py-2 border-t border-gray-300">{loan.bankName}</td>
                        <td className="px-4 py-2 border-t border-gray-300">{loan.total_loans}</td>
                        <td className="px-4 py-2 border-t border-gray-300">{loan.total_amount}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default LoanAllocationTable;
