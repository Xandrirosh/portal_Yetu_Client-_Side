import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ExpenseBarGraph = () => {
    const [graphData, setGraphData] = useState([]);

    const fetchGraphData = async () => {
        try {
            const response = await Axios({ ...SummaryApi.expenseTeacher });
            const { data: responseData } = response;
            if (responseData.success) {
                setGraphData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        fetchGraphData();
    }, []);

    const labels = ['Total Fees', 'Amount Paid', 'Total Salary', 'Outstanding'];

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Amount Spent',
                data: [
                    graphData.totalFees ?? 0,
                    graphData.totalPaid ?? 0,
                    graphData.totalSalary ?? 0,
                    graphData.outstanding ?? 0
                ],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.4)',   // Fees
                    'rgba(16, 185, 129, 0.4)',   // Paid
                    'rgba(245, 158, 11, 0.4)',   // Salary
                    'rgba(239, 68, 68, 0.4)'     // Outstanding
                ],
                borderColor: [
                    '#6366f1',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444'
                ],
                borderWidth: 1
            }
        ]
    };


    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Accounts Expense Summary Overview' },
        },
        scales: {
            x: { stacked: true },
            y: { stacked: true }
        }
    };


    return (
        <div className="w-full max-w-4xl mx-auto">
            {graphData && Object.keys(graphData).length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p className="text-center text-gray-500">Loading chart data...</p>
            )}

        </div>
    );
};
