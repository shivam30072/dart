import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [focussed, setFocussed] = useState(false);
  const [search, setSearch] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (search) {
        navigate(`/tasks?${search}`);
        console.log(search);
      }
    }
  };
  return (
    <Box position={"relative"}>
      <input
        onKeyDown={handleKeyDown}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setFocussed(true)}
        onBlur={() => setFocussed(false)}
        placeholder="Search by Title"
        type="text"
        style={{
          color: focussed ? "1px solid #1976d2" : "1px solid #c5c6d0",
          padding: "16px",
          borderRadius: "20px",
          border: focussed ? "1px solid #1976d2" : "none",
          outline: "none",
          width: "100%",
          minWidth: "340px",
          background: "#eff3f4",
        }}
      />
      <SearchIcon
        sx={{
          position: "absolute",
          right: 8,
          fontSize: "32px",
          top: 8,
          color: focussed ? "#1976d2" : "#536471",
        }}
      />
    </Box>
  );
};

export default SearchInput;
