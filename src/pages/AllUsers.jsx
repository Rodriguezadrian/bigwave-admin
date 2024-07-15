import {
  Box,
  Button,
  Container,
  Modal,
  TextField,
  Tooltip,
  Typography,
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
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function AllUsers() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <Container>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <Button variant="contained" color="success">
                  {" "}
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
                Add New Category
              </Typography>
              <Tooltip title="Close">
                <IconButton onClick={handleCloseModal} >
                  <CloseIcon color="danger" />
                </IconButton>
              </Tooltip>
            </Box>
            <TextField
              id="name"
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: 2, marginTop: 2 }}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              type="text"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              id="image"
              name="image"
              label="Image Link"
              type="text"
              variant="outlined"
              value={formData.image}
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
      </>
    )
  );
}

export default AllUsers;
