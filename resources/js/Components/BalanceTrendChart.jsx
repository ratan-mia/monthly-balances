import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BalanceTrendChart({ trendData }) {
  // Prepare chart data for the Line chart
  const chartLabels = trendData.map((data) => data.date); // Assuming trendData contains 'date'
  const chartBalanceData = trendData.map((data) => data.total_balance);

  const lineChartData = {
    labels: chartLabels, // Dates (e.g., months, weeks)
    datasets: [
      {
        label: 'Balance Over Time',
        data: chartBalanceData, // Total balance over time
        fill: false, // No fill under the line
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        tension: 0.1, // Line smoothness
        borderWidth: 2,
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
        text: 'Balance Trend Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Balance',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 className="font-medium mb-4">Balance Trend Over Time</h3>
      <Line data={lineChartData} options={options} />
    </div>
  );
}
