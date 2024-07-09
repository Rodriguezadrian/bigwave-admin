import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function CategoriesView() {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });
      setCategories(response.data);
    };
    getCategories();
  }, []);
  //   const handleDelete = (id) => {
  //     axios
  //       .delete(`/api/categories/${id}`)
  //       .then(() => {
  //         setCategories(categories.filter((category) => category.id !== id));
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting category:", error);
  //       });
  //   };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/categories/add"
        >
          Add Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/categories/edit/${category.slug}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(category.slug)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default CategoriesView;
