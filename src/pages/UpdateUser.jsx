import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  Paper,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    country: "",
    timezone: "",
    bio: "",
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/client-profile/${params.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUserInfo(response.data);
    };
    getUserInfo();
  }, [user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", userInfo);
  };

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
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
                alt={user.name}
                src={user.avatarUrl}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={userInfo.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="UI Developer">UI Developer</MenuItem>
                    <MenuItem value="Backend Developer">
                      Backend Developer
                    </MenuItem>
                    <MenuItem value="Fullstack Developer">
                      Fullstack Developer
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={userInfo.country}
                    onChange={handleChange}
                    label="Country"
                  >
                    <MenuItem value="Thailand">Thailand</MenuItem>
                    <MenuItem value="USA">USA</MenuItem>
                    <MenuItem value="Germany">Germany</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    name="timezone"
                    value={userInfo.timezone}
                    onChange={handleChange}
                    label="Timezone"
                  >
                    <MenuItem value="GMT+07:00">GMT+07:00</MenuItem>
                    <MenuItem value="GMT-05:00">GMT-05:00</MenuItem>
                    <MenuItem value="GMT+01:00">GMT+01:00</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              margin="normal"
              label="Bio"
              name="bio"
              value={userInfo.bio}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button variant="outlined">Cancel</Button>
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

export default UpdateUser;
