import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom"
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
      },
    },
  };
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "On time",
        data: [8, 6, 9, 5, 4, 6, 7, 8],
        backgroundColor: "#104C9C",
        barPercentage: 0.5,
      },
      {
        label: "Overdue",
        data: [1, 2, 0, 1, 3, 2, 1],
        backgroundColor: "#1AA8E9",
        barPercentage: 0.5,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default BarChart;
