import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BankWiseBalanceChart({ chartData }) {
  // Prepare chart data for the Bar chart
  const chartLabels = chartData.map((data) => data.bank_name);
  const chartValues = chartData.map((data) => data.total_balance);

  const barChartData = {
    labels: chartLabels, // Bank names
    datasets: [
      {
        label: 'Total Balance by Bank',
        data: chartValues, // Total balances
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bank-wise Balance Chart',
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="font-medium mb-4">Bank-wise Balance</h3>
      <Bar data={barChartData} options={options} />
    </div>
  );
}
