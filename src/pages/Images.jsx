import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  IconButton,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const IMAGE_CATEGORIES = [
  { value: "hero", label: "Hero Image" },
  { value: "product", label: "Product Image" },
  { value: "category", label: "Category Image" },
  { value: "other", label: "Other" },
];

function ImageManagement() {
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({
    name: "",
    url: "",
    alt: "",
    category: "",
  });

  const handleOpenModal = (image = null) => {
    if (image) {
      setEditingImage(image);
      setImageForm({
        name: image.name,
        url: image.url,
        alt: image.alt,
        category: image.category,
      });
    } else {
      setEditingImage(null);
      setImageForm({ name: "", url: "", alt: "", category: "" });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingImage(null);
    setImageForm({ name: "", url: "", alt: "", category: "" });
  };

  const handleInputChange = (e) => {
    setImageForm({ ...imageForm, [e.target.name]: e.target.value });
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/upload-image`,
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Imagen subida con éxito:", result.data);
      } else {
        console.error("Error al subir la imagen:", result.error);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.elements.image.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  // const handleDeleteImage = async (id) => {
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_API_URL}/images/${id}`, {
  //       headers: { Authorization: `Bearer ${user.token}` },
  //     });
  //     toast.success("Image deleted successfully");
  //     fetchImages();
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     toast.error("Failed to delete image");
  //   }
  // };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Image Management
        </Typography>
        <Button
          color="success"
          variant="contained"
          startIcon={<AddPhotoAlternateIcon />}
          onClick={() => handleOpenModal()}
          sx={{ mb: 3 }}
        >
          Add New Image
        </Button>
        <Grid container spacing={3}>
          {images.map((image) => (
            <Grid item xs={12} sm={6} md={4} key={image.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.url}
                  alt={image.alt}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {image.name}
                  </Typography>
                  <Chip
                    label={
                      IMAGE_CATEGORIES.find(
                        (cat) => cat.value === image.category
                      )?.label || "Other"
                    }
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOpenModal(image)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {editingImage ? "Edit Image" : "Add New Image"}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box onSubmit={handleSubmit} component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              name="name"
              label="Image Name"
              value={imageForm.name}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="url"
              type="file"
              value={imageForm.url}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              name="alt"
              label="Alt Text"
              value={imageForm.alt}
              onChange={handleInputChange}
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                name="category"
                value={imageForm.category}
                label="Category"
                onChange={handleInputChange}
                required
              >
                {IMAGE_CATEGORIES.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {editingImage ? "Update Image" : "Add Image"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}

export default ImageManagement;
