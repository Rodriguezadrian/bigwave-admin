import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  CssBaseline,
  Link,
  Typography,
} from "@mui/joy";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useState } from "react";

function NewUser() {
  const [user, setUser] = useState({
    name: "Admin",
    lastname: "User",
    role: "UI Developer",
    email: "admin@example.com",
    password: "1234",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para enviar los datos del formulario a la API
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
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
                href="#some-link"
                aria-label="Home"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="/dashboard"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Users
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Update user
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
              Update new user
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
              <Typography
                sx={{ marginBottom: 4 }}
                variant="h4"
                component="h1"
                gutterBottom
              >
                Information
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
                  id="name"
                  name="name"
                  label="Name"
                  value={user.name}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Lastname"
                  value={user.lastname}
                  onChange={handleChange}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    sx={{ marginBottom: 2 }}
                    name="role"
                    value={user.role}
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
                  value={user.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <Button
                  sx={{ backgroundColor: "blueviolet" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update user
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
