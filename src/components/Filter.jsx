import { Box, FormControl, IconButton, Input } from "@mui/joy";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

function Filter() {
  return (
    <>
      <Box component={"form"} display="flex">
        <Input />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
}

export default Filter;
