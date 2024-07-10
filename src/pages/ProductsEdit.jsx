import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  ChevronRightRounded as ChevronRightRoundedIcon,
  HomeRounded as HomeRoundedIcon,
} from "@mui/icons-material";
import { CssBaseline } from "@mui/joy";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function ProductsEdit() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [productDetails, setProductDetails] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProductDetails(response.data);
        setFormData({
          name: response.data.name,
          image: response.data.image,
          description: response.data.description,
          price: response.data.price,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getProductDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      price: formData.price,
    };
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories/${productDetails.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });

      console.log("product updated:", response.data);
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  };

  return (
    productDetails && (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            minHeight: "100dvh",
            background: "white",
          }}
        >
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
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Breadcrumbs size="sm" aria-label="breadcrumbs" sx={{ pl: 0 }}>
                <Link
                  underline="none"
                  color="neutral"
                  href="/"
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
                  Product details
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
            ></Box>
            <Container maxWidth="sm">
              <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Product details
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { marginBottom: 2 },
                    display: "flex",
                    flexDirection: "column",
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    id="image"
                    name="image"
                    label="Image"
                    value={formData.image}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    id="price"
                    name="price"
                    label="Price"
                    value={formData.price}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    sx={{ backgroundColor: "blue" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Update product
                  </Button>
                </Box>
              </Paper>
            </Container>
          </Box>
        </Box>
      </>
    )
  );
}

export default ProductsEdit;
