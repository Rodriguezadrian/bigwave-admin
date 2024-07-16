import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
  Divider,
  Modal,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const UpdateAdmin = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUserInfo({
          email: response.data.email || "",
          firstname: response.data.firstname || "",
          lastname: response.data.lastname || "",
          role: response.data.role || "",
        });
        if (response.data.role === "Admin") {
          setOpenModal(true);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Failed to fetch user information");
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [user.token, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios({
        url: `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: userInfo,
      });
      toast.success("User information updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Failed to update user information");
    }
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    navigate("/users");
  };

  const AdminModal = () => (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="admin-modal-title"
      aria-describedby="admin-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="admin-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Edit Admin Email
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={userInfo.email ?? ""}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            onClick={() => setOpenModal(false)}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );

  if (userInfo.role === "Admin" && openModal) {
    return <AdminModal />;
  }

  return (
    <Box
      sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 2, md: 6 },
          py: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit}
          elevation={3}
          sx={{
            mt: 3,
            maxWidth: 600,
            width: "100%",
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
          >
            Update Admin Profile
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              alt={userInfo.firstname}
              src="/path-to-default-avatar.jpg"
              sx={{ width: 100, height: 100, mr: 3 }}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<EditIcon />}
            >
              Change Avatar
              <input type="file" hidden />
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstname"
                value={userInfo.firstname ?? ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastname"
                value={userInfo.lastname ?? ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userInfo.email ?? ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default UpdateAdmin;