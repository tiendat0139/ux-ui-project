import { Box, Grid, Typography, useTheme } from "@mui/material";
import PageHeader from "../../../components/PageHeader";
import StatisBox from "../../../components/Overview/StatisBox";
import LineChart from "../../../components/Overview/LineChart";
import DoughnutChart from "../../../components/Overview/DoughnutChart";
import BarChart from "../../../components/Overview/BarChart";
import ProgressTable from "../../../components/Overview/ProgressTable";

const Dashboard = () => {
  const { palette } = useTheme();

  return (
    <Box>
      <PageHeader title="Dashboard" />
      <Box sx={{ mt: "8rem", p: "1rem", overflowY: "scroll", height: "80vh" }}>
        <Grid container columnSpacing={4} rowSpacing={2}>
          <Grid item md={8} display="flex" flexDirection="column" gap="2rem">
            <Box display="flex" gap="2rem">
              <StatisBox count={3} title="Project" color1="#083AA9" />
              <StatisBox count={5} title="Complete" color1="#2abba7" />
              <StatisBox count={10} title="Open Tasks" color1="#4185C6" />
              <StatisBox count={20} title="Total Tasks" color1="#FECF16" />
            </Box>
            <Box
              sx={{
                borderRadius: 4,
                p: "1rem",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
              }}
            >
              <Typography
                variant="h4"
                color={palette.text.light}
                sx={{ mb: "1rem" }}
              >
                Working hours
              </Typography>
              <Box sx={{ height: "36vh" }}>
                <LineChart />
              </Box>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              sx={{
                borderRadius: 4,
                p: "1rem",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
              }}
            >
              <Typography
                variant="h4"
                color={palette.text.light}
                sx={{ mb: "1rem" }}
              >
                Summary
              </Typography>
              <Box
                sx={{ height: "48vh", p: "1rem" }}
                display="flex"
                justifyContent="center"
              >
                <DoughnutChart values={[1, 2, 3, 4]} />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                p: "1rem",
                borderRadius: 4,
                boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
              }}
            >
              <Typography
                variant="h4"
                color={palette.text.light}
                sx={{ mb: "1rem" }}
              >
                Performance
              </Typography>
              <Box sx={{ height: "40vh" }}>
                <BarChart />
              </Box>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box
              sx={{
                borderRadius: 4,
                p: "1rem",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.15)",
              }}
            >
              <Typography
                variant="h4"
                color={palette.text.light}
                sx={{ mb: "1rem" }}
              >
                Project
              </Typography>
              <Box sx={{ height: "40vh" }}>
                <ProgressTable />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
