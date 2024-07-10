import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/joy";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Sidebar from "../components/Sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Header from "../components/Header";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function OrderView() {
  const [orderDetails, setOrderDetails] = useState();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    status: "",
    address: "",
    products: [],
    totalAmount: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const params = useParams();

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/orders/${params.id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
        setOrderDetails(response.data);
        setFormData({
          status: response.data.status,
          address: response.data.address,
          products: JSON.stringify(response.data.products),
          totalAmount: response.data.totalAmount,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getOrderDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      status: formData.status,
      address: formData.address,
      totalAmount: formData.totalAmount,
      products: formData.products,
    };
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/orders/${params.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: data,
      });
      console.log("order updated:", response.data);
      navigate("/orders");
    } catch (error) {
      console.error("Error updating the order:", error);
    }
  };
  return (
    orderDetails && (
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
                  href="/"
                  aria-label="Home"
                  separator={<ChevronRightRoundedIcon fontSize="sm" />}
                >
                  <HomeRoundedIcon />
                </Link>
                <Link
                  underline="hover"
                  color="neutral"
                  href="/"
                  sx={{ fontSize: 12, fontWeight: 500 }}
                >
                  Dashboard
                </Link>
                <Typography
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  Order view
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
                Order details
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Order details
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
                    id="status"
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <Typography variant="h6" gutterBottom>
                    Products
                  </Typography>
                  <List>
                    {JSON.parse(formData.products).map((product, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={product.name}
                          secondary={`Quantity: ${product.quantity}, Price: ${product.price}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <TextField
                    required
                    id="totalAmount"
                    name="totalAmount"
                    label="Total Amount"
                    value={formData.totalAmount}
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
                    Update Order
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

export default OrderView;
