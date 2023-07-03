import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ values }) => {
  const { palette } = useTheme();

  const data = {
    labels: ["Project", "School" ,"Part-time" ,"Sport", "Another"],
    datasets: [
      {
        label: "Percent complete",
        data: [...values],
        backgroundColor: ["#4185C6", "#1aa8e9", "#104C9C", "#5DBCA4", "#FECF16"],
        borderColor:  ["#4185C6", "#1aa8e9", "#104C9C", "#5DBCA4", "#FECF16"],
        borderWidth: 1,
        rotation: 144,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout : 120,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        fullSize: true,
        labels: {
          boxWidth: 14,
          color: palette.text.light,
          font: {
            weight: "500",
            size: 14,
            textAlign: "left"
          },
        }
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};

DoughnutChart.propTypes = {
  values: PropTypes.array,
};
export default DoughnutChart;
