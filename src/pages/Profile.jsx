import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    firstName: user.name || "",
    lastName: user.lastName || "",
    email: user.email || "",
  });
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
          method: "PATCH",
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setUserInfo({
          firstName: response.data.name,
          lastName: response.data.lastName,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.id, user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={3}
            sx={{ mt: 3, mx: "auto", maxWidth: 600, p: 3, bgcolor: "white" }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Admin Profile
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                alt={user.name ? user.name : "Undefined"}
                src={user.avatarUrl ? user.avatarUrl : "Undefined"}
                sx={{ width: 80, height: 80, mr: 2 }}
              />
              <Button variant="outlined" component="label">
                Upload
                <input type="file" hidden />
              </Button>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Link to={"/users"}>
                <Button variant="outlined">Cancel</Button>
              </Link>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
