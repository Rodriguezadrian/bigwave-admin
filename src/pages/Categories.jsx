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
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import { IconButton, Stack, Tooltip } from "@mui/joy";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filter from "../components/Filter";

function Categories() {
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [categoryCreated, setCategoryCreated] = useState(false);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const categoriesPerPage = 10;
  const displayedCategories = categories.slice(
    (page - 1) * categoriesPerPage,
    page * categoriesPerPage
  );

  const emptyRows = categoriesPerPage - displayedCategories.length;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDelete = (id) => {
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <Button
          onClick={() => {
            toast.dismiss(toastId);
            handleDeleteCategory(id);
          }}
        >
          Yes, delete
        </Button>
        <Button onClick={() => toast.dismiss(toastId)}>Cancel</Button>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    setCategoryCreated(false);
  }, [categoryCreated]);

  //open update profile modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleNewCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/categories`,
        method: "post",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          name: formData.name,
          description: formData.description,
          image: formData.image,
        },
      });
      handleCloseModal();
      setCategoryCreated(true);
      toast.info(`Category created successfully`);
      console.log("Category created:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios({
        url: `${import.meta.env.VITE_API_URL}/categories/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
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
          <Container>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <StarIcon sx={{ mr: 1, color: "#68844a" }} />
              <Typography
                variant="h4"
                component="h2"
                color="#68844a"
                fontWeight="medium"
              >
                Categories
              </Typography>
            </Box>
            <Filter />
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                onClick={handleOpenModal}
                variant="contained"
                color="success"
              >
                {" "}
                New
                <AddIcon fontSize="medium" color="white" />
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Link
                            style={{ color: "black" }}
                            to={`/categories/edit/${category.slug}`}
                          >
                            <EditIcon />
                          </Link>
                          <Link style={{ color: "#cf2727" }}>
                            <DeleteIcon
                              onClick={() => handleDelete(category.id)}
                            />
                          </Link>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Pagination
                count={Math.ceil(categories.length / categoriesPerPage)}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
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
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Category
                </Typography>
                <Tooltip title="Close">
                  <IconButton>
                    <CloseIcon color="danger" onClick={handleCloseModal} />
                  </IconButton>
                </Tooltip>
              </Box>
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
                color="success"
                fullWidth
                sx={{ mt: 2 }}
              >
                Save
              </Button>
            </Box>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default Categories;
