import React, { useState, useEffect } from "react";
import Spotify from "../Spotify.js";
import { useParams } from "react-router-dom";
import {
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    Typography,
    Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        const fetchPlaylist = async () => {
            try {
                const data = await Spotify.getPlaylist(playlistId);
                setPlaylist(data);
            } catch (error) {
                console.error("Error fetching playlist details:", error);
            }
        };

        fetchPlaylist();
    }, [playlistId]);

    const handleDelete = (trackId) => {
        console.log(`Track with ID ${trackId} deleted.`);
    };

    return (
        <Box sx={{ padding: "20px", minHeight: "100vh", overflowY: "auto" }}>
            {playlist ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        {playlist.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {playlist.description || "No description available."}
                    </Typography>

                    <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
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
                                            onClick={() => handleDelete(item.track.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    sx={{
                                        marginBottom: "10px",
                                        borderBottom: "1px solid #444"
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            src={
                                                item.track.album.images?.[0]?.url ||
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
        </Box>
    );
};

export default PlaylistDetails;