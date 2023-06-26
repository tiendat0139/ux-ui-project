import { useTheme } from "@emotion/react";
import { Avatar, Box, Typography, alpha } from "@mui/material";
import PropTypes from "prop-types";
import avatar1 from "../../assets/img/avatar/1.png";

const Item = ({comment}) => {
  const { palette } = useTheme();

  return (
    <Box display="flex" gap="1rem" sx={{mb: "2rem"}}>
      <Avatar sx={{ bgcolor: "#ABE1FB", color: "#000", fontSize: "1.8rem" }} src={avatar1} />
      <Box>
        <Box display="flex" gap="2rem" alignItems="center" fullWidth>
          <Typography
            color={alpha(palette.text.light, 0.8)}
            fontWeight={500}
            fontSize="1.6rem"
          >
            Nguyen Tien Dat
          </Typography>
          <Typography
            color={alpha(palette.text.light, 0.8)}
            fontWeight={400}
            fontSize="1.3rem"
          >
            {comment?.time}
          </Typography>
        </Box>
        <Box>
          <Typography fontSize="1.4rem" color="rgba(0,0,0,0.6)">
            {comment?.title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
Item.propTypes = {
  comment: PropTypes.object,
};
export default Item;
