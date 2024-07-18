import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  Typography,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal, Tooltip } from "@mui/joy";

function AllUsers() {
  const user = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const dispatch = useDispatch();
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/users`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers");
      }
    };

    const getAdmins = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/admins`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error("Failed to fetch admins");
      }
    };

    getCustomers();
    getAdmins();
  }, [user.token]);

  const handleDelete = (userEmail, userType) => {
    const toastId = toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <Button
          onClick={() => {
            toast.dismiss(toastId);
            confirmDelete(userEmail, userType);
          }}
        >
          Yes, delete
        </Button>
        <Button onClick={() => toast.dismiss(toastId)}>Cancel</Button>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false }
    );
  };

  const confirmDelete = async (id, userType) => {
    try {
      let url;
      if (userType === "Customer") {
        url = `${import.meta.env.VITE_API_URL}/users/client-profile/${id}`;
      } else {
        url = `${import.meta.env.VITE_API_URL}/admins/${id}`;
      }

      await axios({
        url: url,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (userType === "Customer") {
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        setAdmins(admins.filter((admin) => admin.id !== id));
      }

      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Customers
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "white",
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Link to={`/update-user/${user.id}`}>
                        <IconButton style={{ color: "black" }}>
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        style={{ color: "#cf2727" }}
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Admins
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((user, index) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "white",
                    }}
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Link to={`/update-admin/${user.id}`}>
                        <IconButton style={{ color: "black" }}>
                          <EditIcon />
                        </IconButton>
                      </Link>

                      <IconButton
                        style={{ color: "#cf2727" }}
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllUsers;
