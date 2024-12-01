import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProfitMarginOverTime = ({ profitData }) => {
    // Prepare the chart data
    const chartData = {
        labels: profitData.map(item => item.date),  // X-axis labels: Date (e.g., "2024-01", "2024-02", ...)
        datasets: [
            {
                label: 'Profit Margin (%)',
                data: profitData.map(item => item.profit_margin),  // Profit margin data points
                borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Fill color under the line
                tension: 0.4,  // Smooth curve for the line
                fill: true,  // Fill the area under the line
                borderWidth: 2,  // Line thickness
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (Months)',
                    font: {
                        size: 14,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Profit Margin (%)',
                    font: {
                        size: 14,
                    },
                },
                ticks: {
                    beginAtZero: true,
                    max: 100,  // Assuming profit margin is between 0% and 100%
                    stepSize: 10,
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Profit Margin Over Time',
                font: {
                    size: 18,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.raw.toFixed(2)}%`;  // Format the tooltip as percentage
                    },
                },
            },
        },
    };

    return (
        <div className="profit-margin-over-time">
            {/* <h2>Profit Margin Over Time</h2> */}
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ProfitMarginOverTime;
