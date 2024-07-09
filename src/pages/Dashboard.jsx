import {
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
  Button,
} from "@mui/joy";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Paper from "@mui/material/Paper";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CategoriesView from "../components/CategoriesView";
import ProductsView from "../components/ProductsView";

function Dashboard() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box width={{ xs: "100%", md: "48%" }} mb={3}>
              <Paper elevation={3}>
                <Link
                  to="/categories"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h5" align="center" padding={3}>
                    Categories
                  </Typography>
                </Link>
                <Box display="flex" justifyContent="center" padding={2}>
                  <CategoriesView />
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/categories/add"
                  >
                    Add Category
                  </Button>
                </Box>
              </Paper>
            </Box>
            <Box width={{ xs: "100%", md: "48%" }} mb={3}>
              <Paper elevation={3}>
                <Link
                  to="/products"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h5" align="center" padding={3}>
                    Products
                  </Typography>
                </Link>
                <Box display="flex" justifyContent="center" padding={2}>
                  <ProductsView />
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/products/add"
                  >
                    Add Product
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Dashboard;
