import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  Modal,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoriesView() {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //open update profile modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
  }, []);

  const handleNewCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories`,
        method: "post",
        data: {
          name: formData.name,
          description: formData.description,
          image: formData.image,
        },
      });
      handleCloseModal();
      toast.info("Category created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleDelete = async (id) => {
  //     try {
  //       const response = await axios({
  //         method: "delete",
  //         url: `${import.meta.env.VITE_API_URL}/categories/${id}`,
  //       });
  //       setCategories(categories.filter((category) => category.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting category:", error);
  //     }
  //   };

  return (
    <>
      <Container>
        <ToastContainer />
        <Typography variant="h4" gutterBottom>
          Categories
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            onClick={handleOpenModal}
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
                      onClick={() => handleDelete(category.id)}
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleNewCategory}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Category
          </Typography>
          <TextField
            id="name"
            name="name"
            label="Name"
            type="text"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <TextField
            id="description"
            name="description"
            label="Description"
            type="text"
            variant="outlined"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="image"
            name="image"
            label="Image Link"
            type="text"
            variant="outlined"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default CategoriesView;
