// resources/js/Components/CompanyBalancePieChart.jsx

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const CompanyBalancePieChart = ({ companyData }) => {
  // Prepare the data for the Pie chart
  const chartData = {
    labels: companyData.map(item => item.companyName),  // Company names as labels
    datasets: [
      {
        label: 'Balance by Company',
        data: companyData.map(item => item.balance),  // Balance data
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF9633'], // Colors for the pie chart segments
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Configure chart options (tooltip and responsiveness)
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: $${tooltipItem.raw.toFixed(2)}`; // Format tooltip with $ sign
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-white">Balance Distribution by Company</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CompanyBalancePieChart;
