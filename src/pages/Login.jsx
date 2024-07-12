import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/joy";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("menganito@gmail.com");
  const [password, setPassword] = useState("1234");
  const navigate = useNavigate();

  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/tokens/admin`,
        method: "post",
        data: { email, password },
      });

      if (response.data.token) {
        dispatch(login(response.data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
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
          <Container component="main" maxWidth="sm" className="mt-5">
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
              <Typography
                component="h2"
                variant="h4"
                align="center"
                gutterBottom
              >
                Login to your account
              </Typography>
              <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  variant="outlined"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2, py: 1.5, fontSize: "1rem" }}
                >
                  Login
                </Button>
                <Typography align="center" sx={{ mt: 2 }}>
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }}
                  >
                    Not registered yet?
                  </Link>
                </Typography>
              </Box>
            </Paper>
            <Paper elevation={6} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>
                Admin Credentials
              </Typography>
              <Typography>
                To simplify access to the application, the following test admin
                is provided:
              </Typography>
              <Box mt={2}>
                <Typography variant="subtitle1">Login as admin</Typography>
                <ul>
                  <li>Email: menganito@gmail.com</li>
                  <li>Password: 1234</li>
                </ul>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
