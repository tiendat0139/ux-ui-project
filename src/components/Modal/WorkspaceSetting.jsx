import { useState } from "react";
import {
  Modal,
  Box,
  useTheme,
  Fade,
  Backdrop,
  Typography,
  Avatar,
  InputBase,
  IconButton,
  Tooltip,
  ClickAwayListener,
} from "@mui/material";
import PropTypes from "prop-types";
import avt1 from "../../assets/img/avatar/1.png";
import avt2 from "../../assets/img/avatar/2.png";
import avt3 from "../../assets/img/avatar/3.png";
import avt4 from "../../assets/img/avatar/4.png";
import Icon from "../Icons";
import { useParams } from "react-router-dom";

const WorkspaceSetting = ({ open, setOpenModal }) => {
  const { palette } = useTheme();
  const { id } = useParams();
  const handleClose = () => setOpenModal(false);

  const [openTooltip, setOpenTooltip] = useState(false);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleTooltipOpen = () => {
    setOpenTooltip(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 200,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30%",
            borderRadius: "1.2rem",
            outline: "none",
            overflow: "hidden",
            p: "3rem",
          }}
        >
          <Typography variant="h4" fontWeight={500} sx={{ mb: "2rem" }}>
            Share settings
          </Typography>

          <Box
            display="flex"
            gap="1rem"
            alignItems="center"
            sx={{
              bgcolor: "#f4f6fa",
              p: "0.5rem 1rem",
              borderRadius: "10rem",
              mb: "1.6rem",
            }}
          >
            <Icon name="search" size={24} />
            <InputBase
              sx={{ width: "100%" }}
              placeholder="Search for name, email"
            />
          </Box>

          <Typography variant="h5" sx={{ mb: "2rem" }}>
            Workspace members
          </Typography>
          {id === "1" && (
            <Box>
              <MemberItem
                name="Nguyen Duc Hoang"
                email="hoangnd@gmail.com"
                avt={avt2}
                isOwner={true}
              />
              <MemberItem
                name="Nguyen Tien Dat"
                email="tiendat@gmail.com"
                avt={avt1}
              />
              <MemberItem
                name="Hoang The Anh"
                email="anhht@gmail.com"
                avt={avt3}
              />
              <MemberItem
                name="Pham Xuan Duy"
                email="duypx@gmail.com"
                avt={avt4}
              />
            </Box>
          )}
          {id === "2" && (
            <Box>
              <MemberItem
                name="Nguyen Duc Hoang"
                email="hoangnd@gmail.com"
                avt={avt2}
                isOwner={true}
              />
              <MemberItem
                name="Nguyen Tien Dat"
                email="tiendat@gmail.com"
                avt={avt1}
              />
              <MemberItem
                name="Hoang The Anh"
                email="anhht@gmail.com"
                avt={avt3}
              />
              <MemberItem
                name="Pham Xuan Duy"
                email="duypx@gmail.com"
                avt={avt4}
              />
            </Box>
          )}
          {id === "3" && (
            <Box>
              <MemberItem
                name="Nguyen Tien Dat"
                email="tiendat@gmail.com"
                avt={avt1}
                isOwner={true}
              />
              <MemberItem
                name="Nguyen Duc Hoang"
                email="hoangnd@gmail.com"
                avt={avt2}
              />
              <MemberItem
                name="Hoang The Anh"
                email="anhht@gmail.com"
                avt={avt3}
              />
              <MemberItem
                name="Pham Xuan Duy"
                email="duypx@gmail.com"
                avt={avt4}
              />
            </Box>
          )}
          <Typography variant="h5" sx={{ mb: "0.8rem", mt: "3rem" }}>
            Invite Share Link
          </Typography>
          <Box
            display="flex"
            gap="1rem"
            alignItems="center"
            sx={{
              bgcolor: "#f4f6fa",
              p: "0.5rem 1rem",
              borderRadius: "1rem",
              mb: "1.6rem",
            }}
          >
            <InputBase
              disabled
              value="http://workmate-hi08/4MzBXd/usp=sharing"
              sx={{
                width: "100%",
                fontFamily: "Outfit",
                color: palette.text.light,
              }}
              placeholder="Search for name, email"
            />
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <Tooltip
                  PopperProps={{
                    disablePortal: true,
                  }}
                  onClose={handleTooltipClose}
                  open={openTooltip}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  title="Copied"
                  placement="top"
                >
                  <IconButton onClick={handleTooltipOpen}>
                    <Icon name="copy" size={24} />
                  </IconButton>
                </Tooltip>
              </div>
            </ClickAwayListener>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export const MemberItem = ({ name, avt, email, isOwner }) => {
  const { palette } = useTheme();
  return (
    <Box display="flex" alignItems="center" sx={{ mb: "1rem" }}>
      <Avatar
        sx={{ width: "3.6rem", height: "3.6rem", mr: "1rem" }}
        src={avt}
      />
      <Box sx={{ width: "100%" }}>
        <Typography>{name}</Typography>
        <Typography color={palette.text.light} variant="h6" fontWeight={400}>
          {email}
        </Typography>
      </Box>
      {isOwner && <Typography>Owner</Typography>}
    </Box>
  );
};

WorkspaceSetting.propTypes = {
  open: PropTypes.bool,
  setOpenModal: PropTypes.func,
};

MemberItem.propTypes = {
  name: PropTypes.string,
  avt: PropTypes.string,
  email: PropTypes.string,
  isOwner: PropTypes.bool,
};
MemberItem.defaultProps = {
  isOwner: false,
};

export default WorkspaceSetting;
