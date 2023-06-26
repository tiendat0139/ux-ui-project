import { Box } from "@mui/material"
import DayView from "../../../components/Calendar"
import PageHeader from "../../../components/PageHeader"

const Calendar = () => {
  return(
    <Box>
      <PageHeader title="Calendar" />
      <Box sx={{ mt: "8rem"}}>
        <DayView />
      </Box>
    </Box>
  )
}
export default Calendar
