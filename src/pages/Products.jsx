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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Tooltip } from "@mui/joy";
import axios from "axios";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function Products() {
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const productsPerPage = 10;
  const displayedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  const emptyRows = productsPerPage - displayedProducts.length;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <Button
          onClick={() => {
            toast.dismiss(toastId);
            handleDeleteProduct(id);
          }}
        >
          Yes, delete
        </Button>
        <Button onClick={() => toast.dismiss(toastId)}>Cancel</Button>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/products`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProducts(response.data);
    };
    getProducts();
  }, []);

  //open update profile modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleNewProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/products`,
        method: "post",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          name: formData.name,
          description: formData.description,
          image: formData.image,
          price: formData.price,
        },
      });

      handleCloseModal();
      toast.info(`Product created successfully`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios({
        url: `${import.meta.env.VITE_API_URL}/products/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
      toast.info("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
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
            bgcolor: "white",
          }}
        >
          <Container>
            <Typography variant="h4" gutterBottom>
              Products
            </Typography>
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
                    <TableCell
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayedProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "space-evenly" }}
                      >
                        <Link to={`/products/edit/${product.slug}`}>
                          <EditIcon />
                        </Link>
                        <Link>
                          <DeleteIcon
                            onClick={() => handleDelete(product.id)}
                          />
                        </Link>
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
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Pagination
                count={Math.ceil(products.length / productsPerPage)}
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
              onSubmit={handleNewProduct}
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
                  Add New Product
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
                id="price"
                name="price"
                label="Price"
                type="text"
                variant="outlined"
                value={formData.price}
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

export default Products;
