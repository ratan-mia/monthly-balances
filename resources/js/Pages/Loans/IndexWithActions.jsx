import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, Link } from '@inertiajs/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import * as XLSX from 'xlsx'; // Import xlsx package

export default function Index({ loans, total_loans, total_paid, total_balance }) {

    const deleteLoan = (id) => {
        if (confirm('Are you sure you want to delete this loan?')) {
            Inertia.delete(`/loans/${id}`);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = [
            'User Name', 'Company', 'Loan Amount', 'Interest Rate',
            'Start Date', 'End Date', 'Paid Amount', 'Outstanding Balance'
        ];

        const tableRows = loans.map(loan => [
            loan.user ? loan.user.name : 'N/A',
            loan.company ? loan.company.name : 'N/A',
            loan.loan_amount || '0',
            loan.interest_rate || '0%',
            loan.start_date || 'N/A',
            loan.end_date || 'N/A',
            loan.paid_amount || '0',
            loan.outstanding_balance || '0',
        ]);

        // Add title before the table
        doc.setFontSize(18);
        doc.text('Loans Report', 14, 20);

        // Add the table
        doc.setFontSize(12);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30, // Start the table below the title
        });

        // Calculate totals for the summary
        const totalLoans = total_loans || 0;
        const totalPaid = total_paid || 0;
        const totalBalance = total_balance || 0;

        // Add the summary under the relevant columns
        doc.autoTable({
            head: [['', '', '', '', '', '', 'Total Loans', 'Total Paid', 'Total Balance']],
            body: [
                ['', '', '', '', '', '', totalLoans, totalPaid, totalBalance]
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
        doc.save('loans_report.pdf');
    };

    const printTable = () => {
        const printContent = document.getElementById('loans-table').outerHTML;
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
                title: 'Loans Report',
                text: 'Check out the loans report.',
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert('Sharing not supported on this browser');
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(loans.map((loan) => ({
            'User Name': loan.user ? loan.user.name : 'N/A',
            'Company': loan.company ? loan.company.name : 'N/A',
            'Loan Amount': loan.loan_amount || '0',
            'Interest Rate': loan.interest_rate || '0%',
            'Start Date': loan.start_date || 'N/A',
            'End Date': loan.end_date || 'N/A',
            'Paid Amount': loan.paid_amount || '0',
            'Outstanding Balance': loan.outstanding_balance || '0',
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Loans');

        // Download the Excel file
        XLSX.writeFile(workbook, 'loans.xlsx');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Loans
                </h2>
            }
        >
            <Head title="Loans" />

            <div className="container w-full mx-auto px-6 py-8">
                {/* Create Loan Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Loans</h1>

                    <div className="text-right space-x-4">
                        <Link
                            href="/loans/create"
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Add Loan
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
                            onClick={shareReport}
                            className="inline-block bg-transparent text-blue-600 text-sm font-medium px-3 py-1.5 border border-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                            Share Report
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table id="loans-table" className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">User Name</th>
                                <th className="py-2 px-4 border-b">Company</th>
                                <th className="py-2 px-4 border-b">Loan Amount</th>
                                <th className="py-2 px-4 border-b">Interest Rate</th>
                                <th className="py-2 px-4 border-b">Start Date</th>
                                <th className="py-2 px-4 border-b">End Date</th>
                                <th className="py-2 px-4 border-b">Paid Amount</th>
                                <th className="py-2 px-4 border-b">Outstanding Balance</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td className="py-2 px-4 border-b">{loan.user ? loan.user.name : 'N/A'}</td>
                                    <td className="py-2 px-4 border-b">{loan.company ? loan.company.name : 'N/A'}</td>
                                    <td className="py-2 px-4 border-b">{loan.loan_amount || '0'}</td>
                                    <td className="py-2 px-4 border-b">{loan.interest_rate || '0%'}</td>
                                    <td className="py-2 px-4 border-b">{loan.start_date || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b">{loan.end_date || 'N/A'}</td>
                                    <td className="py-2 px-4 border-b">{loan.paid_amount || '0'}</td>
                                    <td className="py-2 px-4 border-b">{loan.outstanding_balance || '0'}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => deleteLoan(loan.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
