import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopPerformingCompanies = ({ topCompaniesData }) => {
    // Prepare data for the chart
    const chartData = {
        labels: topCompaniesData.map(item => item.companyName),  // List of company names
        datasets: [
            {
                label: 'Total Balance',
                data: topCompaniesData.map(item => item.total_balance),  // List of total balances
                backgroundColor: 'rgba(75, 192, 192, 0.5)',  // Color for the bars
                borderColor: 'rgba(75, 192, 192, 1)',        // Border color for the bars
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
            },
        },
        plugins: {
            title: {
                display: true,
                text: '',
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `$${tooltipItem.raw.toLocaleString()}`;  // Format tooltip as currency
                    },
                },
            },
        },
    };

    return (
        <div className="top-performing-companies">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TopPerformingCompanies;
