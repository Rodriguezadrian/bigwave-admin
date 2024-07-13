import * as React from "react";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import Sidebar from "../components/Sidebar";
import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";
import Header from "../components/Header";
import ChartProductsSold from "../components/ChartProductsSold";
import BarChartUsers from "../components/BarChartUsers";
import { Link } from "react-router-dom";

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
          height: "100dvh",
          gap: 1,
        }}
      >
        <div className="chart-father">
          <div className="chart-container">
            <ChartProductsSold />
          </div>
          <div className="chart-container">
            <BarChartUsers />
          </div>
        </div>
        <OrderTable />
        <OrderList />
      </Box>
    </>
  );
}

export default Dashboard;
