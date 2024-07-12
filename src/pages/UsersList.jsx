import {
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function UsersList() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/users`,
        method: "get",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setUsers(response.data);
    };
    getUsers();
  }, []);

  return (
    users && (
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
              <Breadcrumbs
                size="sm"
                aria-label="breadcrumbs"
                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                sx={{ pl: 0 }}
              >
                <Link to={"/"}>
                  <HomeRoundedIcon />
                </Link>
                <Typography
                  color="primary"
                  sx={{ fontWeight: 500, fontSize: 12 }}
                >
                  Users
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
            ></Box>
            <Container>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  color="success"
                >
                  New
                  <AddIcon fontSize="medium" color="white" />
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "rgba(0, 0, 0, 0.04)" : "white",
                        }}
                        key={user.id}
                      >
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Link to={`/update-user/${user.id}`}>
                            <EditIcon />
                          </Link>
                          <IconButton onClick={() => handleDelete("")}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Box>
        </Box>
      </>
    )
  );
}

export default UsersList;
