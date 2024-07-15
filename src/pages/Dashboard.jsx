import * as React from "react";
import Box from "@mui/joy/Box";
import ChartsProducts from "../components/ChartProducts";

function Dashboard() {
  return (
    <>
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          minHeightheight: "100dvh",
          gap: 1,
        }}
      >
        <ChartsProducts />
      </Box>
    </>
  );
}

export default Dashboard;
