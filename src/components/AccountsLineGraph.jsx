import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const AccountsLineGraph = () => {
    const [graphData, setGraphData] = useState([]);

    const fetchGraphData = async () => {
        try {
            const response = await Axios({ ...SummaryApi.getMonthlyAccounts });
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

    // Safely compute labels and datasets after data is fetched
    const labels = graphData.map(d =>
        new Date(2025, d.month - 1).toLocaleString('default', { month: 'short' })
    );

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Fees',
                data: graphData.map(d => d.fees),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                fill: true,
            },
            {
                label: 'Amount Paid',
                data: graphData.map(d => d.paid),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Monthly Accounts Overview' },
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {graphData.length > 0 ? (
                    <Line data={chartData} options={options} />
            ) : (
                <p className="text-center text-gray-500">Loading chart data...</p>
            )}
        </div>
    );
};
