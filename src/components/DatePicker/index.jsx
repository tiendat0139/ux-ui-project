import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useTheme } from "@emotion/react";
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PropTypes from "prop-types";

const CustomDatePicker = ({ label, name, value, setValue }) => {
  const { palette } = useTheme();
  const maxHour = dayjs().set("hour", 23).startOf("hour");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem>
          <DateTimePicker
            label={label}
            sx={{
              fontSize: "1.6rem",
              svg: {
                width: "2rem",
                height: "2rem",
                color: palette.text.light,
              },
            }}
            maxTime={maxHour}
            format="DD/MM/YYYY HH:mm"
            ampm={false}
            name={name}
            value={value}
            onChange={(e) => setValue(e)}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
};
CustomDatePicker.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
  setValue: PropTypes.func,
};

export default CustomDatePicker;
