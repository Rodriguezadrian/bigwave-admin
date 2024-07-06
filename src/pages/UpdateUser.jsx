import { Box, CssBaseline } from "@mui/joy";
import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function UpdateUser() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
      </Box>
    </>
  );
}

export default UpdateUser;
