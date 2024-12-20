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
        backgroundColor: ['#B4A7D6', '#A1D6A1', '#A6C8FF', '#FFB3D9', '#FFD1A6'],
        // Colors for the pie chart segments
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
            // Fix tooltip to display correct data
            const { datasetIndex, dataIndex } = tooltipItem;
            const value = chartData.datasets[datasetIndex].data[dataIndex];
            return `${tooltipItem.label}: $${value.toFixed(2)}`; // Format tooltip with $ sign
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-2 rounded-lg shadow dark:bg-gray-100">
      {/* <h3 className="text-xl font-semibold mb-4 text-white">Balance Distribution by Company</h3> */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CompanyBalancePieChart;
