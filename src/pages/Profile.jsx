// AdminProfileForm.js
import React, { useState } from "react";
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

const AdminProfileForm = () => {
  const [userEx, setUserEx] = useState({
    name: "Admin",
    lastName: "Lopez",
    role: "UI Developer",
    email: "admin@example.com",
    avatarUrl: "https://via.placeholder.com/150",
    country: "Thailand",
    timezone: "GMT+07:00",
    bio: "Admin bio goes here...",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", user);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
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
                alt={userEx.name}
                src={userEx.avatarUrl}
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
                  value={userEx.name}
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
                  value={userEx.lastName}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={userEx.role}
                    onChange={onChange}
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
                  value={userEx.email}
                  onChange={onChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="country"
                    value={userEx.country}
                    onChange={onChange}
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
                    value={userEx.timezone}
                    onChange={onChange}
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
              value={userEx.bio}
              onChange={onChange}
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

export default AdminProfileForm;
