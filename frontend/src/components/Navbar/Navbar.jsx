import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchInput from "../SearchInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../Modals/ProfileModal";

const Navbar = () => {
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClickOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleOpenProfile = () => {
    handleClose();
    handleClickOpenProfile();
  };
  return (
    <Box
      padding={"14px 32px"}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px"}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={{ xs: "flex", md: "none" }}>
        <MenuIcon />
      </Box>

      <Typography
        onClick={() => navigate("/home")}
        display={{ xs: "none", md: "flex" }}
        textAlign={"start"}
        sx={{ cursor: "pointer" }}
      >
        TO-DO
      </Typography>
      <Box display={{ xs: "flex", md: "none" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Box>

      {/* -----------------------SEARCH-INPUT------------------ */}
      <Box display={{ xs: "none", md: "flex" }}>
        <SearchInput />
      </Box>
      <Box display={{ xs: "none", md: "flex" }}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <AccountCircleIcon fontSize="large" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Box>
      <ProfileModal open={openProfile} handleClose={handleCloseProfile} />
    </Box>
  );
};

export default Navbar;
