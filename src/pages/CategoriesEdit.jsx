import {
  Box,
  Breadcrumbs,
  Button,
  Container,
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
import { CssBaseline, IconButton, Tooltip } from "@mui/joy";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CategoriesEdit() {
  const params = useParams();
  const user = useSelector((state) => state.user);
  const [categoriesDetails, setCategoriesDetails] = useState();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    products: [],
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getCategoriesDetails = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/categories/${params.id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        setCategoriesDetails(response.data);
        setFormData({
          name: response.data.name,
          image: response.data.image,
          description: response.data.description,
          products: response.data.Products,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCategoriesDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      products: JSON.parse(formData.products),
    };
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories/${
          categoriesDetails.id
        }`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });

      console.log("category updated:", response.data);
      navigate("/dashboard");
      toast.info("category created succesfully");
      console.log(data.name);
    } catch (error) {
      console.error("Error updating the category:", error);
    }
  };

  return (
    categoriesDetails && (
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
                  to={"/"}
                  separator={<ChevronRightRoundedIcon fontSize="sm" />}
                >
                  <HomeRoundedIcon />
                </Link>
                <Link to={"/dashboard"} sx={{ fontSize: 12, fontWeight: 500 }}>
                  Dashboard
                </Link>
                <Typography
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  Category details
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
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Category Information
                  </Typography>
                  <Link to={"/categories"}>
                  <Tooltip title="Back">
                    <IconButton>
                      <ArrowBackIcon />
                    </IconButton>
                  </Tooltip>
                  </Link>
                </Box>
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
                  <Typography variant="h6" gutterBottom>
                    Products
                  </Typography>

                  {/* <List>
                    {categoriesDetails.Products.map((product, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={product.name}
                          secondary={`$${product.price}`}
                        />
                      </ListItem>
                    ))}
                  </List> */}

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
                    Update Category
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

export default CategoriesEdit;
