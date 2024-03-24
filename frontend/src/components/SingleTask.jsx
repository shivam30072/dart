import { Box, Checkbox, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./Modals/DeleteModal";

const SingleTask = ({
  item,
  handleDelete,
  handleGetProductById,
  setDeleteTasks,
  found = true,
}) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteItem = () => {
    handleDelete(item?._id);
  };

  const handleChangeCheckBox = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked === true) {
      setDeleteTasks((prev) => {
        const tasks = [...prev];
        tasks.push(item?._id);
        return tasks;
      });
    } else {
      setDeleteTasks((prev) => {
        const tasks = [...prev];
        const filteredtasks = tasks.filter((task) => task !== item?._id);
        return filteredtasks;
      });
    }
  };
  return (
    <Box
      padding={"8px 12px"}
      borderRadius={"8px"}
      border={"2px solid #ededed"}
      bgcolor={checked ? "#e50000" : ""}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box display={"flex"} gap={"4px"} alignItems={"center"}>
          <Checkbox
            sx={{
              "&.Mui-checked": {
                color: checked ? "#fff" : "",
              },
            }}
            disabled={!found ? true : false}
            onChange={handleChangeCheckBox}
          />
          <Typography fontSize={"20px"} fontWeight={700}>
            {item?.title}
          </Typography>
        </Box>
        {found && (
          <Box display={"flex"} gap={"4px"} alignItems={"center"}>
            <EditIcon
              sx={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleGetProductById(item?._id)}
            />
            <DeleteIcon
              sx={{ color: checked ? "white" : "red", cursor: "pointer" }}
              onClick={handleClickOpenDelete}
            />
          </Box>
        )}
      </Box>
      <Box pl={"46px"}>
        <Typography>{item?.description}</Typography>
      </Box>

      <DeleteModal
        open={openDelete}
        handleClose={handleCloseDelete}
        handleDeleteItem={handleDeleteItem}
      />
    </Box>
  );
};

export default SingleTask;
