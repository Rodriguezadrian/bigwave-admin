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
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { Breadcrumbs, CssBaseline, IconButton, Tooltip } from "@mui/joy";
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
  const formattedPath = useLocation()
    .pathname.replace(/^\//, "")
    .replace(/^./, (str) => str.toUpperCase());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

  const handleDelete = async (id) => {
    try {
      await axios({
        url: `${import.meta.env.VITE_API_URL}/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProducts(products.filter((product) => product.id !== id));
      toast.info(`Product deleted succesfully`);
      navigate("/products");
    } catch (error) {
      console.error("Error updating the product:", error);
    }
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh", bgcolor: "white" }}>
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
            minHeightheight: "100dvh",
            gap: 1,
            bgcolor: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link to={"/"}>
                <HomeRoundedIcon />
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                {formattedPath}
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
          <Container>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Products;
