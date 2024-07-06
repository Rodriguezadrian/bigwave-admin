import {
  Box,
  Breadcrumbs,
  Button,
  CssBaseline,
  Link,
  Typography,
} from "@mui/joy";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderTable from "../components/OrderTable";
import OrderList from "../components/OrderList";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

function NewUser() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs size="sm" aria-label="breadcrumbs" sx={{ pl: 0 }}>
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="/dashboard"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Dashboard
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Orders
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Orders
            </Typography>
            <Button color="primary" size="sm">
              Download PDF
            </Button>
          </Box>
          <OrderTable />
          <OrderList />
        </Box>
      </Box>
    </>
  );
}

export default NewUser;
