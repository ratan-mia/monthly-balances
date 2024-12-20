import { jsPDF } from 'jspdf';
import 'tailwindcss/tailwind.css';

const Show = ({ balanceData }) => {
  // Sample data in case the invoice data is missing
  const sampleData = {
    company: {
      name: "Sample Company",
      address: "123 Sample Street, City, Country"
    },
    invoice_number: "INV-12345",
    date: "2024-11-01",
    due_date: "2024-11-15",
    items: [
      { description: "Sample Item 1", quantity: 1, price: 50, total: 50 }

    ],
    subtotal: 100,
    tax: 10,
    total: 110,
    user_id: 1,
    company_id: 1,
    bank_id: 1,
    account_type_id: 1,
    account_number: "1234567890",
    opening_balance: 1000,
    inflows: 500,
    outflows: 200,
    closing_balance: 1300

  };

  // Check if the balanceData is provided, otherwise use sampleData
  const company = balanceData?.company || sampleData.company;
  const invoiceNumber = balanceData?.invoice_number || sampleData.invoice_number;
  const date = balanceData?.date || sampleData.date;
  const dueDate = balanceData?.due_date || sampleData.due_date;
  const items = balanceData?.items || sampleData.items;
  const subtotal = balanceData?.subtotal || sampleData.subtotal;
  const tax = balanceData?.tax || sampleData.tax;
  const total = balanceData?.total || sampleData.total;
  const userId = balanceData?.user_id || sampleData.user_id;
  const companyId = balanceData?.company_id || sampleData.company_id;
  const bankId = balanceData?.bank_id || sampleData.bank_id;
  const accountTypeId = balanceData?.account_type_id || sampleData.account_type_id;
  const accountNumber = balanceData?.account_number || sampleData.account_number;
  const openingBalance = balanceData?.opening_balance || sampleData.opening_balance;
  const inflows = balanceData?.inflows || sampleData.inflows;
  const outflows = balanceData?.outflows || sampleData.outflows;
  const closingBalance = balanceData?.closing_balance || sampleData.closing_balance;

  // Function to handle PDF generation and download
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title and company name
    doc.setFontSize(20);
    doc.text('Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(company.name, 20, 30);
    doc.text(company.address, 20, 40);

    // Invoice details
    doc.text(`Invoice Number: ${invoiceNumber}`, 20, 50);
    doc.text(`Date: ${date}`, 20, 60);
    doc.text(`Due Date: ${dueDate}`, 20, 70);

    // Table headers
    doc.text('Description', 20, 80);
    doc.text('Quantity', 100, 80);
    doc.text('Price', 140, 80);
    doc.text('Total', 180, 80);

    // Table rows
    items.forEach((item, index) => {
      doc.text(item.description, 20, 90 + index * 10);
      doc.text(item.quantity.toString(), 100, 90 + index * 10);
      doc.text(`$${item.price}`, 140, 90 + index * 10);
      doc.text(`$${item.total}`, 180, 90 + index * 10);
    });

    // Invoice totals
    doc.text(`Subtotal: $${subtotal}`, 20, 100 + items.length * 10);
    doc.text(`Tax: $${tax}`, 20, 110 + items.length * 10);
    doc.text(`Total: $${total}`, 20, 120 + items.length * 10);

    // Save the PDF
    doc.save(`${invoiceNumber}.pdf`);
  };

  // Function to handle printing
  const printInvoice = () => {
    window.print(); // This will open the browser's print dialog
  };

  // Function to handle email with invoice PDF (basic mailto)
  const emailInvoice = () => {
    const mailtoLink = `mailto:?subject=Invoice ${invoiceNumber}&body=Please find attached the invoice ${invoiceNumber} for your reference.`;
    window.location.href = mailtoLink; // This will open the default email client
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Invoice Details</h1>
        <div className="space-y-2">
          <p><strong>Company:</strong> {company.name}</p>
          <p><strong>Address:</strong> {company.address}</p>
          <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </div>
        <div className="mt-4">

        <table className="min-w-full table-auto border-collapse">
        <thead>
            <tr>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">User ID</th>
            <th className="border p-2">Company ID</th>
            <th className="border p-2">Bank ID</th>
            <th className="border p-2">Account Type ID</th>
            <th className="border p-2">Account Number</th>
            <th className="border p-2">Opening Balance</th>
            <th className="border p-2">Inflows</th>
            <th className="border p-2">Outflows</th>
            <th className="border p-2">Closing Balance</th>
            </tr>
        </thead>
        <tbody>
            {items.map((item, index) => (
            <tr key={index}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">${item.price}</td>
                <td className="border p-2">${item.total}</td>
                <td className="border p-2">{userId}</td>
                <td className="border p-2">{companyId}</td>
                <td className="border p-2">{bankId}</td>
                <td className="border p-2">{accountTypeId}</td>
                <td className="border p-2">{accountNumber}</td>
                <td className="border p-2">${openingBalance}</td>
                <td className="border p-2">${inflows}</td>
                <td className="border p-2">${outflows}</td>
                <td className="border p-2">${closingBalance}</td>
            </tr>
            ))}
        </tbody>
        </table>


        </div>
        <div className="mt-4">
          <p><strong>Subtotal:</strong> ${subtotal}</p>
          <p><strong>Tax:</strong> ${tax}</p>
          <p><strong>Total:</strong> ${total}</p>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white p-2 rounded-md"
        >

          Download PDF
        </button>
        <button
          onClick={printInvoice}
          className="bg-green-500 text-white p-2 rounded-md"
        >
          Print
        </button>
        <button
          onClick={emailInvoice}
          className="bg-yellow-500 text-white p-2 rounded-md"
        >
          Email Now
        </button>
      </div>
    </div>
  );
};

export default Show;
