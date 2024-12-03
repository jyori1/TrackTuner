import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { FormControl, InputLabel, TextField, Typography, Box, Modal, FormControlLabel, FormLabel, Switch } from '@mui/material';


const CreatePlaylistModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = () => {
    console.log(name, description, isPrivate);
  };


  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="create-playlist-title" aria-describedby="create-playlist-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="create-playlist-title" variant="h6" component="h2" gutterBottom>
          Create Playlist
        </Typography>
        <Typography id="create-playlist-description" sx={{ mb: 3 }}>
          Complete the following fields to create a playlist.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            {/* <InputLabel htmlFor="name" shrink>Playlist Name</InputLabel> */}
            <TextField
              required
              id="name"
              variant="standard"
              placeholder="Enter playlist name"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            {/* <InputLabel htmlFor="description">Description</InputLabel> */}
            <TextField
              id="description"
              variant="standard"
              multiline
              rows={4}
              placeholder="Describe your playlist (optional)"
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel component="legend">Privacy</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  id="privateToggle"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              }
              label={isPrivate ? "Private" : "Public"}
            />
          </FormControl>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Playlist
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CreatePlaylistModal