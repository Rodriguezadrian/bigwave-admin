import { Box, Container, CssBaseline, Link, Typography } from "@mui/joy";
import Button from "@mui/joy/Button";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function ErrorPage() {
  return (
    <>
      <div>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Typography
          sx={{ color: "red", textAlign: "center" }}
          level="h2"
          component="h1"
        >
          Error page
        </Typography>
        <Box
          width={200}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          <Container maxWidth="sm">
            <img src="https://static.vecteezy.com/system/resources/previews/004/435/751/original/404-error-page-with-black-cat-illustrations-not-found-system-updates-uploading-operation-computing-installation-programs-vector.jpg" />
          </Container>
        </Box>
      </div>
    </>
  );
}

export default ErrorPage;
