import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  CircularProgress,
  Input,
  Grid,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Image = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCurrentImage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/hero-image`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setCurrentImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching current hero image:", error);
        toast.error("Failed to fetch current hero image");
      }
    };

    fetchCurrentImage();
  }, [user.token]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Create a preview URL for the selected image
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("heroImage", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hero-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCurrentImage(response.data.imageUrl);
      toast.success("Hero image updated successfully");
      setFile(null);
      setPreviewUrl("");
    } catch (error) {
      console.error("Error updating hero image:", error);
      toast.error("Failed to update hero image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Update Hero Image
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Current Hero Image:
            </Typography>
            {currentImage ? (
              <img
                src={currentImage}
                alt="Current Hero"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <Typography>No hero image currently set.</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Upload New Hero Image:
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Input
                type="file"
                onChange={handleFileChange}
                sx={{ display: "none" }}
                id="hero-image-upload"
                accept="image/*"
              />
              <label htmlFor="hero-image-upload">
                <Button
                  variant="contained"
                  color="success"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Select New Image
                </Button>
              </label>
              {previewUrl && (
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Preview:
                  </Typography>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </Box>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={loading || !file}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Update Hero Image"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Image;
