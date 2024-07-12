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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function OrderView() {
  const [orderDetails, setOrderDetails] = useState();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getOrderDetails();
  }, []);

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
    address: Yup.string().required("Address is required"),
    totalAmount: Yup.number().required("Total Amount is required").positive(),
  });

  const handleSubmit = async (values) => {
    const data = {
      status: values.status,
      address: values.address,
      totalAmount: values.totalAmount,
      products: values.products,
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
      navigate("/");
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
                  aria-label="Home"
                  separator={<ChevronRightRoundedIcon fontSize="sm" />}
                >
                  <HomeRoundedIcon />
                </Link>
                <Link sx={{ fontSize: 12, fontWeight: 500 }}>Dashboard</Link>
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
                <Formik
                  initialValues={{
                    status: orderDetails.status,
                    address: orderDetails.address,
                    products: orderDetails.products,
                    totalAmount: orderDetails.totalAmount,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field
                        as={TextField}
                        required
                        id="status"
                        name="status"
                        label="Status"
                        fullWidth
                        margin="normal"
                        error={touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                      />
                      <Field
                        as={TextField}
                        required
                        id="address"
                        name="address"
                        label="Address"
                        fullWidth
                        margin="normal"
                        error={touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                      />
                      <Typography variant="h6" gutterBottom>
                        Products
                      </Typography>
                      <List>
                        {orderDetails.products.map((product, index) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={product.name}
                              secondary={`Quantity: ${product.quantity}, Price: ${product.price}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Field
                        as={TextField}
                        required
                        id="totalAmount"
                        name="totalAmount"
                        label="Total Amount"
                        fullWidth
                        margin="normal"
                        error={touched.totalAmount && !!errors.totalAmount}
                        helperText={touched.totalAmount && errors.totalAmount}
                      />
                      <Button
                        sx={{ backgroundColor: "blue" }}
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Update Order
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Paper>
            </Container>
          </Box>
        </Box>
      </>
    )
  );
}

export default OrderView;
