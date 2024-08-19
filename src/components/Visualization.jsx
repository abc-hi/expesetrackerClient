import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);



const Visualization = () => {
  const [chartData, setChartData] = useState({ monthly: [], categories: [] });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('https://expensetrackerserver-w3dy.onrender.com/chart-data');
        setChartData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChartData();
  }, []);

  const lineChartData = {
    labels: chartData.monthly.map((data) => data._id),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: chartData.monthly.map((data) => data.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const pieChartData = {
    labels: chartData.categories.map((data) => data._id),
    datasets: [
      {
        label: 'Category Distribution',
        data: chartData.categories.map((data) => data.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Visualization</h2>
      <Line data={lineChartData} />
      <Pie data={pieChartData} />
    </div>
  );
};

export default Visualization;
