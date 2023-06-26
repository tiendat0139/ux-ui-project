import { alpha } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        fill: true,
        lineTension: 0.4,
        data: [4, 5, 8, 6, 7, 3, 4],
        // backgroundColor: palette.primary.light,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, alpha("#3793fb", 0.3));
          gradient.addColorStop(1, alpha("#3793fb", 0));
          return gradient;
        },
        borderColor: "#3793fb",
        pointRadius: 4,
        pointHoverRadius: 8,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
        min: 0,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
