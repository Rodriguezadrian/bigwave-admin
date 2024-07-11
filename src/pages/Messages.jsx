import {
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
  Tab,
} from "@mui/joy";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Paper from "@mui/material/Paper";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function Messages() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Header />
        <Sidebar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Messages
          </Typography>
          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box width={{ xs: "100%", md: "100%" }} mb={3}>
              <Paper elevation={3}>
                <Box display="flex" justifyContent="center" padding={2}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>John Doe</TableCell>
                        <TableCell>Important meeting at 15:00</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                          <Button variant="contained" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Alexander Hamilton</TableCell>
                        <TableCell>Error at the Storage Center</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                          <Button variant="contained" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Miriam Stall</TableCell>
                        <TableCell>HR</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                          <Button variant="contained" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>4</TableCell>
                        <TableCell>Cindy McMorton</TableCell>
                        <TableCell>Vacation days discution</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary">
                            View
                          </Button>
                          <Button variant="contained" color="error">
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Messages;
