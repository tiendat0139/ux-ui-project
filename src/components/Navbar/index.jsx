import { Box, Button, Typography, alpha, useTheme } from "@mui/material";
import { SettingsOutlined, LogoutOutlined } from "@mui/icons-material";
import logo from "../../assets/img/logo.svg";
import NavItem from "./NavItem";
import Dropdown from "./Dropdown";
import Input from "../SearchBox";
import Icon from "../Icons";
import PropTypes from "prop-types";
import Notification from "../Notification";

const Navbar = ({ handleOpenModal }) => {
  const { palette } = useTheme();
  const dropdownItemList = [
    {
      text: "Setting",
      icon: <SettingsOutlined fontSize="small" />,
      href: "/account/setting",
    },
    {
      text: "Logout",
      icon: <LogoutOutlined fontSize="small" />,
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: "0 1rem",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        zIndex: 10,
      }}
      position="fixed"
      top="0"
      left="0"
      right="0"
    >
      <Box display="flex" alignItems="center" gap="6rem">
        <Box display="flex" gap="1rem">
          <img src={logo} width={24}></img>
          <Typography
            variant="h3"
            color={palette.primary.main}
            fontSize={24}
            fontWeight={600}
          >
            Workmate
          </Typography>
        </Box>
        <Box display="flex" gap="2rem">
          <NavItem name="Workspace" />
          <NavItem name="Recent" />
          <NavItem name="Templates" />
        </Box>
        <Button
        variant="contained"
        sx={{
          p: "0.8rem 2rem",
          ":hover": {
            color: "white",
            bgcolor: alpha(palette.primary.main, 0.9),
            
          },
        }}
          onClick={handleOpenModal}
        >
          <Typography variant="h5">Create</Typography>
        </Button>
      </Box>
      <Box display="flex" alignItems="center" gap="3rem">
        <Input />
        <Box display="flex" gap="2rem" alignItems="center">
          <Icon name="question" size={16} />
          <Notification />
        </Box>
        <Dropdown menuItemList={dropdownItemList} />
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  handleOpenModal: PropTypes.func,
};
export default Navbar;
