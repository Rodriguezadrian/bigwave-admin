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
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useState } from "react";

function NewUser() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se puede agregar la lógica para enviar los datos del formulario a la API
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                Dashboard
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Create new user
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
              Create new user
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Create new User
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
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                  Crear Usuario
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
