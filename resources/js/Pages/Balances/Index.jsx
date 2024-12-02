import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import { useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import xlsx package


import 'datatables.net'; // Import DataTables JS
import 'datatables.net-dt/css/jquery.dataTables.min.css'; // Import DataTables CSS
import $ from 'jquery'; // Import jQuery





export default function Index({ balances, total_inflows, total_outflows, total_closing_balance }) {

    // DataTable initialization
    useEffect(() => {
        // Initialize DataTable after the component mounts
        $('#balances-table').DataTable();
    }, []);

    const deleteBalance = (id) => {
        if (confirm('Are you sure you want to delete this balance?')) {
            Inertia.delete(`/balances/${id}`);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            'User Name', 'Company', 'Bank', 'Account Type', 'Account Number',
            'Opening Balance', 'Inflows', 'Outflows', 'Closing Balance'
        ];

        const tableRows = balances.map(balance => [
            balance.user ? balance.user.name : 'N/A',
            balance.company ? balance.company.name : 'N/A',
            balance.bank ? balance.bank.name : 'N/A',
            balance.account_type ? balance.account_type.name : 'N/A',
            balance.account_number || 'N/A',
            balance.opening_balance || '0',
            balance.inflows || '0',
            balance.outflows || '0',
            balance.closing_balance || '0',
        ]);

        // Add title before the table
        doc.setFontSize(18);
        doc.text('Balances Report', 14, 20);

        // Add the table
        doc.setFontSize(12);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30, // Start the table below the title
        });

        // Calculate totals for the summary
        const totalInflows = total_inflows || 0;
        const totalOutflows = total_outflows || 0;
        const totalClosingBalance = total_closing_balance || 0;

        // Add the summary under the relevant columns
        doc.autoTable({
            head: [['', '', '', '', '', '', 'Total Inflows', 'Total Outflows', 'Total Closing Balance']],
            body: [
                ['', '', '', '', '', '', totalInflows, totalOutflows, totalClosingBalance]
            ],
            startY: doc.lastAutoTable.finalY + 10, // Start the summary below the table
            theme: 'grid',
            columnStyles: {
                6: { halign: 'center', fontStyle: 'bold' },
                7: { halign: 'center', fontStyle: 'bold' },
                8: { halign: 'center', fontStyle: 'bold' },
            }
        });

        // Save the PDF
        doc.save('balances_report.pdf');
    };

    const printTable = () => {
        const printContent = document.getElementById('balances-table').outerHTML;
        const newWindow = window.open('', '', 'width=800,height=600');
        newWindow.document.write('<html><head><title>Print</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.0.2/dist/tailwind.min.css" /></head><body>');
        newWindow.document.write(printContent);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();
    };

    const shareReport = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Balances Report',
                text: 'Check out the balances report.',
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Sharing not supported on this browser');
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(balances.map((balance) => ({
            'User Name': balance.user ? balance.user.name : 'N/A',
            'Company': balance.company ? balance.company.name : 'N/A',
            'Bank': balance.bank ? balance.bank.name : 'N/A',
            'Account Type': balance.account_type ? balance.account_type.name : 'N/A',
            'Account Number': balance.account_number || 'N/A',
            'Opening Balance': balance.opening_balance || '0',
            'Inflows': balance.inflows || '0',
            'Outflows': balance.outflows || '0',
            'Closing Balance': balance.closing_balance || '0',
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Balances');

        // Download the Excel file
        XLSX.writeFile(workbook, 'balances.xlsx');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Balances
                </h2>
            }
        >
            <Head title="Balances" />

            <div className="container w-full mx-auto px-6 py-8">
                {/* Create Balance Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Balances</h1>

                    <div className="text-right space-x-4">
                        <Link
                            href="/balances/create"
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Add Balance
                        </Link>
                        {/* Action Buttons */}
                        <button
                            onClick={downloadExcel}
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Download Excel
                        </button>

                        <button
                            onClick={downloadPDF}
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Download PDF
                        </button>

                        <button
                            onClick={printTable}
                            className="inline-block bg-transparent text-yellow-600 text-sm font-medium px-3 py-1.5 border border-yellow-600 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                        >
                            Print
                        </button>

                        <button
                            onClick={shareReport}
                            className="inline-block bg-transparent text-purple-600 text-sm font-medium px-3 py-1.5 border border-purple-600 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300"
                        >
                            Share
                        </button>

                    </div>
                </div>

                {/* Balances Table */}
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table id="balances-table" className="min-w-full table-auto">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">User Name</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Company</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Bank</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Account Type</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Account Number</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Opening Balance</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Inflows</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Outflows</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Closing Balance</th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {balances.map((balance) => (
                                <tr key={balance.id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.user ? balance.user.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.company ? balance.company.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.bank ? balance.bank.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.account_type ? balance.account_type.name : 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.account_number || 'N/A'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.opening_balance || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.inflows || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.outflows || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{balance.closing_balance || '0'}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700 space-x-4">
                                        <Link
                                            href={`/balances/${balance.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-700 font-medium transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteBalance(balance.id)}
                                            className="text-red-600 hover:text-red-700 font-medium transition-all"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* Totals Row */}
                        <tfoot>
                            <tr className="bg-gray-100">
                                <td className="px-4 py-2 border text-right font-semibold" colSpan="6">
                                    Totals:
                                </td>
                                <td className="px-4 py-2 border font-semibold">{total_inflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_outflows}</td>
                                <td className="px-4 py-2 border font-semibold">{total_closing_balance}</td>
                                <td className="px-4 py-2 border"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
