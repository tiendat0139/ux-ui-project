import {
  Box,
  Typography,
  Avatar,
  useTheme,
  alpha,
  AvatarGroup,
} from "@mui/material";
import Icon from "../Icons";
import PropTypes from "prop-types";
import avt1 from "../../assets/img/avatar/1.png";
import avt2 from "../../assets/img/avatar/2.png";
import avt3 from "../../assets/img/avatar/3.png";
import avt4 from "../../assets/img/avatar/4.png";

const WorkspaceTaskCard = ({ title, des, due, priority, relatedUser }) => {
  const { palette } = useTheme();
  const avatar = ["", avt1, avt2, avt3, avt4];
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="1.2rem"
      sx={{
        bgcolor: "#fff",
        p: "1rem",
        mb: "2rem",
        borderRadius: "0.8rem",
        boxShadow: "1px 2px 4px rgba(0,0,0,0.2)",
      }}
    >
      <Box display="flex" flexDirection="column" gap="0.6rem">
        <Typography
          fontWeight={500}
          variant="h5"
          color={alpha("#000", 0.8)}
          fontFamily="Roboto"
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          color={palette.text.light}
          fontWeight={400}
          fontFamily="Roboto"
        >
          {des}
        </Typography>
      </Box>
      <Box display="flex" gap="1rem">
        <Box
          display="flex"
          gap="0.6rem"
          sx={{
            p: "0.2rem 0.8rem",
            bgcolor: palette.background.light,
            borderRadius: "0.4rem",
          }}
        >
          <Icon name="calendar" size={16} />
          <Typography fontSize="1.2rem" color={palette.text.light}>
            {due}
          </Typography>
        </Box>
        <Box
          display="flex"
          gap="0.6rem"
          sx={{
            p: "0.2rem 0.8rem",
            bgcolor: palette.background.light,
            borderRadius: "0.4rem",
          }}
        >
          <Icon name="clock" size={16} />
          <Typography fontSize="1.2rem" color={palette.text.light}>
            8 hours
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap="0.4rem">
          <AvatarGroup>
            <Avatar
              sx={{ width: "3rem", height: "3rem" }}
              src={avatar[relatedUser[0]]}
            />
            <Avatar
              sx={{ width: "3rem", height: "3rem" }}
              src={avatar[relatedUser[1]]}
            />
            <Avatar
              sx={{ width: "3rem", height: "3rem" }}
              src={avatar[relatedUser[2]]}
            />
          </AvatarGroup>
        </Box>
        <Box display="flex" gap="1.6rem">
          <Box display="flex" gap="0.4rem">
            <Icon name="comment" size={24} />
            <Typography
              variant="h6"
              fontFamily="Roboto"
              color={palette.text.light}
              fontWeight={400}
            >
              3
            </Typography>
          </Box>
          {priority == "high" && (
            <Icon name="up-filled" size={22} type="filled" />
          )}
          {priority == "normal" && (
            <Icon name="equal-filled" size={22} type="filled" />
          )}
          {priority == "low" && (
            <Icon name="down-filled" size={22} type="filled" />
          )}
        </Box>
      </Box>
    </Box>
  );
};

WorkspaceTaskCard.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
  due: PropTypes.string,
  priority: PropTypes.string,
  workspaceId: PropTypes.string,
  relatedUser: PropTypes.array
};
export default WorkspaceTaskCard;
