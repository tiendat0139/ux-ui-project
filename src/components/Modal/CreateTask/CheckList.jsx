import {
  Box,
  IconButton,
  useTheme,
  InputBase,
  Button,
  Typography,
} from "@mui/material";
import Icon from "../../Icons";
import PropTypes from "prop-types";

const CheckList = ({checkList, setCheckList}) => {
  const { palette } = useTheme();

  const handleAddItem = () => {
    setCheckList([...checkList, ""])
  };
  const handleRemoveItem = (index) => {
    let newCheckList = [...checkList]
    newCheckList.splice(index,1)
    setCheckList(newCheckList)
  }
  const handleChange = (e, index) => {
    let newCheckList = [...checkList]
    newCheckList[index] = {name: e.target.value, status: 0}
    setCheckList(newCheckList)
  }
  return (
    <Box>
      {checkList.map((item, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          gap="0.8rem"
          sx={{
            px: "0.8rem",
            "&:hover": {
              backgroundColor: "#f6f7f9",
            },
          }}
        >
          <Icon name="dot-filled" size={8} color="#4a90e2" />
          <InputBase
            fullWidth
            autoFocus={true}
            value={item.name}
            sx={{ color: palette.text.light, fontSize: "1.5rem" }}
            onChange={(e) => handleChange(e, index)}
          />
          <IconButton onClick={() => handleRemoveItem(index)}>
            <Icon name="delete" size={16} color={palette.danger.main} />
          </IconButton>
        </Box>
      ))}
      <Button sx={{ mt: "0.5rem" }} onClick={handleAddItem}>
        <Icon name="plus" size={24} color="#4a90e2" />
        <Typography color="#4a90e2" variant="h6">
          Add checklist
        </Typography>
      </Button>
    </Box>
  );
};

CheckList.propTypes = {
  checkList: PropTypes.array,
  setCheckList: PropTypes.func
}

export default CheckList;
