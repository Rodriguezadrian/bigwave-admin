import { Box, CssBaseline } from "@mui/joy";
import React from "react";
import Header from "../components/Header";

function Dashboard() {
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

export default Dashboard;
