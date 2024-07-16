import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { IconButton, Tooltip } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductsEdit() {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [productsDetails, setProductsDetails] = useState();
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    CategoryId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getProductsDetails = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/products/${params.id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        setProductsDetails(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image,
          CategoryId: response.data.CategoryId,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getProductsDetails();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCategories(response.data);
    };
    getCategories();
  }, [categories]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      price: formData.price,
      CategoryId: parseInt(formData.CategoryId, 10),
    };
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/products/${productsDetails.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });

      console.log("product updated:", response.data);
      toast.info("product updated successfully");
      navigate("/products");
    } catch (error) {
      console.error("Error updating the product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    productsDetails && (
      <>
        <Box
          sx={{
            display: "flex",
            minHeight: "100dvh",
            background: "white",
          }}
        >
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
            <Container maxWidth="sm">
              <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography variant="h4" component="h4" gutterBottom>
                    Product details
                  </Typography>
                  <Link to={"/products"}>
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
                  onSubmit={handleUpdate}
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="CategoryId"
                      id="CategoryId"
                      name="CategoryId"
                      value={formData.CategoryId}
                      onChange={handleChange}
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
