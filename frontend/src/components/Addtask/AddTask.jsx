import { Box, Button, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteAllTaskModal from "../Modals/DeleteAllTaskModal";
import { filters } from "../../constants";

const AddTask = ({ handleOpen, deleteTasks, setAllTask }) => {
  const [openAllDelete, setOpenAllDelete] = useState(false);
  const [anchorElFlt, setAnchorElFlt] = useState(null);

  const open = Boolean(anchorElFlt);
  const handleClickFlt = (event) => {
    setAnchorElFlt(event.currentTarget);
  };
  const handleCloseFlt = () => {
    setAnchorElFlt(null);
  };

  const handleClickOpenAllDelete = () => {
    setOpenAllDelete(true);
  };

  const handleCloseAllDelete = () => {
    setOpenAllDelete(false);
  };
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"} gap={"12px"}>
        <Button
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#3b40d5",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 12px",
            "&:hover": {
              bgcolor: "#3b40d5",
              color: "#fff",
            },
          }}
        >
          Add New
        </Button>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickFlt}
          startIcon={<FilterAltIcon />}
          sx={{
            bgcolor: "#fff",
            color: "#000",
            borderRadius: "8px",
            padding: "6px 10px",
            border: "1px solid #000",
            "&:hover": {
              bgcolor: "#fff",
              color: "#000",
            },
          }}
        >
          Filters
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElFlt}
          open={open}
          onClose={handleCloseFlt}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {filters.map((item) => (
            <MenuItem key={item?.label}>{item.label}</MenuItem>
          ))}
        </Menu>
      </Box>
      <Tooltip title={"Bulk Delete"}>
        <Button
          onClick={deleteTasks.length === 0 ? null : handleClickOpenAllDelete}
          sx={{
            bgcolor: deleteTasks.length === 0 ? "#d3d3d3" : "#e50000",
            borderRadius: "8px",
            minWidth: "32px",
            border: "none",
            "&:hover": {
              bgcolor: deleteTasks.length === 0 ? "#d3d3d3" : "#fff",
              border: deleteTasks.length === 0 ? "" : "1px solid #e50000",
            },
          }}
        >
          <DeleteIcon
            sx={{
              color: "#fff",
              "&:hover": {
                color: deleteTasks.length === 0 ? "#fff" : "#e50000",
              },
            }}
          />
        </Button>
      </Tooltip>
      <DeleteAllTaskModal
        open={openAllDelete}
        handleClose={handleCloseAllDelete}
        deleteTasks={deleteTasks}
        setAllTask={setAllTask}
      />
    </Box>
  );
};

export default AddTask;
