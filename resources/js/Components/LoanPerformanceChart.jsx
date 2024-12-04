import { Line } from 'react-chartjs-2';

const LoanPerformanceChart = ({ loanPerformance }) => {
    console.log(loanPerformance);
    const data = {
        labels: loanPerformance.map(item => `Month ${item.month}`),
        datasets: [
            {
                label: 'Total Loans',
                data: loanPerformance.map(item => item.total_loans),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Total Loan Amount',
                data: loanPerformance.map(item => item.total_amount),
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default LoanPerformanceChart;
