import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/joy";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NewUser() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddNewUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/users`,
        method: "post",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
        },
      });
      console.log("User created:", response.data);
      toast.info("User created successfully");
      navigate("/users");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create user");
    }
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
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
              <Typography
                sx={{ marginBottom: 4 }}
                variant="h4"
                component="h1"
                gutterBottom
              >
                New User
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
                onSubmit={handleAddNewUser}
              >
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label="Firstname"
                  value={userData.firstname}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Lastname"
                  value={userData.lastname}
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    sx={{ marginBottom: 2 }}
                    name="role"
                    value={userData.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                <Button
                  sx={{ backgroundColor: "blueviolet" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create user
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default NewUser;
