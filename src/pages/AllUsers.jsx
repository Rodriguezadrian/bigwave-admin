import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, Modal, TextField, Tooltip } from "@mui/joy";

function AllUsers() {
  const user = useSelector((state) => state.user);
  const [customers, setCustomers] = useState([]);
  const [admins, setAdmins] = useState([]);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const confirmDelete = async (userEmail, userType) => {
    try {
      await axios({
        url: `${import.meta.env.VITE_API_URL}/users/client-profile`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: { email: userEmail },
      });
      if (userType === "Customer") {
        setCustomers(customers.filter((u) => u.email !== userEmail));
      } else {
        setAdmins(admins.filter((u) => u.email !== userEmail));
      }
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  const UserTable = ({ users, title, userType }) => (
    <Paper sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        {title}
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
          {users.map((user, index) => (
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
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={() => handleDelete(user.email, userType)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="success"
        >
          New <AddIcon fontSize="small" />
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UserTable users={customers} title="Customers" userType="Customer" />
        </Grid>
        <Grid item xs={12} md={6}>
          <UserTable users={admins} title="Admins" userType="Admin" />
        </Grid>
      </Grid>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
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
              Add New User
            </Typography>

            <Tooltip title="Close">
              <IconButton onClick={handleCloseModal}>
                <CloseIcon color="danger" />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            id="firstname"
            name="firstname"
            label="Firstname"
            type="text"
            variant="outlined"
            value={admins.firstname}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <TextField
            id="lastname"
            name="lastname"
            label="Lastname"
            type="text"
            variant="outlined"
            value={admins.lastname}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <FormControl margin="normal" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              sx={{ marginBottom: 2 }}
              name="role"
              value={admins.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="text"
            variant="outlined"
            value={admins.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="text"
            variant="outlined"
            value={admins.password}
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
    </Box>
  );
}

export default AllUsers;
