import React, { useState, useEffect, useCallback } from "react";
import Spotify from "../Spotify.js";
import { useParams, useNavigate } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Typography,
    Box,
    Snackbar,
    Alert,
    AppBar,
    Toolbar,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Recommendations from "./Recommendations.js";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();
    const [playlist, setPlaylist] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const fetchPlaylist = useCallback(async () => {
        try {
            const data = await Spotify.getPlaylist(playlistId);
            setPlaylist(data);
        } catch (error) {
            console.error("Error fetching playlist details:", error);
        }
    }, [playlistId]);

    useEffect(() => {
        fetchPlaylist();
    }, [fetchPlaylist]);

    const refreshPlaylist = () => {
        fetchPlaylist();
    };

    const handleDelete = (trackId) => {
        try {
            Spotify.deleteFromPlaylist(playlistId, trackId);
            setPlaylist((prev) => {
                const newTracks = prev.tracks.items.filter(
                    (item) => item.track.id !== trackId
                );
                return { ...prev, tracks: { items: newTracks } };
            });
            setSnackbarMessage("Track removed from playlist.");
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Error deleting track from playlist:", error);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            {/* Transparent Navbar */}
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: "transparent", // Matches the background
                    boxShadow: "none", // Removes shadow
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Spotify Playlist Details
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: "20px", minHeight: "100vh", overflowY: "auto" }}>
                {playlist ? (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {playlist.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {playlist.description || "No description available."}
                        </Typography>

                        <Typography
                            variant="h6"
                            gutterBottom
                            sx={{ marginTop: "20px" }}
                        >
                            Tracks:
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <List
                                sx={{
                                    maxWidth: "800px",
                                    width: "100%",
                                    bgcolor: "background.paper",
                                    borderRadius: "8px",
                                    padding: "10px",
                                }}
                            >
                                {playlist.tracks.items.map((item) => (
                                    <ListItem
                                        key={item.track.id}
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() =>
                                                    handleDelete(item.track.id)
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        sx={{
                                            marginBottom: "10px",
                                            borderBottom: "1px solid #444",
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={
                                                    item.track.album.images?.[0]
                                                        ?.url ||
                                                    "https://via.placeholder.com/150"
                                                }
                                                variant="square"
                                                sx={{ width: 56, height: 56 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.track.name}
                                            secondary={item.track.artists
                                                .map((artist) => artist.name)
                                                .join(", ")}
                                            sx={{ marginLeft: "16px" }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
                <Recommendations
                    playlistId={playlistId}
                    onTrackAdded={() => {
                        refreshPlaylist();
                        setSnackbarMessage("Track added to playlist.");
                        setSnackbarOpen(true);
                    }}
                />
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
};

export default PlaylistDetails;