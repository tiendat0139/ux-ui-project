import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ values }) => {
  const { palette } = useTheme();

  const data = {
    labels: ["Project", "Learning", "Part-time", "Another"],
    datasets: [
      {
        label: "Percent complete",
        data: [...values],
        backgroundColor: ["#1AA8E9", "#28d64e", "#9f80fa", "#fc859d"],
        borderColor: ["#9f7aef", "#75cdff", "#cae384", "#fc859d"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout : 90,
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
