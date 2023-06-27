import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Box, Checkbox, Typography, alpha } from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";
import Progress from "../Progress";

const Checklist = ({ list }) => {
  const { palette } = useTheme();
  const [checkList, setCheckList] = useState([]);
  

  const handleChange = (e, index) => {
    const newList = [...checkList];
    newList[index].checked = e.target.checked;
    setCheckList(newList);
  };

  const countChecked = () => {
    const count = checkList?.filter((item) => {
      return item.checked;
    }).length;
    return Math.floor((count / checkList?.length) * 100);
  };

  useEffect(() => {
    setCheckList(list)
  }, [list])

  return (
    <Box sx={{mt: "1.5rem"}}>
      <Box sx={{ mb: "1.5rem" }}>
        <Typography variant="h5" sx={{ mb: "1rem" }} fontWeight={500}>
          {countChecked()}% complete
        </Typography>
        <Progress value={countChecked()} />
      </Box>
      <Box
        sx={{
          border: "1px solid rgba(0,0,0,0.15)",
          p: "1.5rem 1rem",
          borderRadius: "1rem",
          height: "12rem",
          overflowY: "scroll",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography fontSize="1.8rem" fontWeight={500} sx={{ px: "1rem" }}>
            Check List
          </Typography>
          <Typography variant="h6" color={palette.text.light}>
            {checkList?.length + " tasks"}
          </Typography>
        </Box>
        <Box>
          {checkList?.map((item, index) => (
            <Box display="flex" alignItems="center" key={index}>
              <Checkbox
                icon={
                  <Icon name="check-box" size={24} color="rgba(0,0,0,0.2)" />
                }
                checkedIcon={
                  <Icon name="checkbox-checked" size={24} color={"#0f5efc"} />
                }
                checked={item.checked}
                onChange={(e) => handleChange(e, index)}
              />
              <Typography color={alpha("#000", 0.6)}>{item.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

Checklist.propTypes = {
  list: PropTypes.array,
};
export default Checklist;
