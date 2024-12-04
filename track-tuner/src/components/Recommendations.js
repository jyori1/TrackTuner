import React, { useState, useEffect } from "react";
import Spotify from "../Spotify.js";
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
import AddIcon from "@mui/icons-material/Add";

const Recommendations = ({ playlistId, onTrackAdded }) => {
    const [recommendations, setRecommendations] = useState(null);

    const fetchRecommendations = async () => {
        try {
            const data = await Spotify.getTopSongs();
            if (!data || data.length === 0) {
                console.error("No recommendations found.");
                return;
            }
            setRecommendations(data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const handleAddition = async (trackUri) => {
        try {
            await Spotify.addToPlaylist(playlistId, trackUri);
            console.log(`Track ${trackUri} added to playlist ${playlistId}`);
            onTrackAdded();
        } catch (error) {
            console.error("Error adding track to playlist:", error);
        }
    };

    return (
        <Box sx={{ padding: "20px", minHeight: "100vh", overflowY: "auto" }}>
            {recommendations ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Recommendations
                    </Typography>
                    <List>
                        {recommendations.map((track) => (
                            <ListItem key={track.id}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="square"
                                        src={track.album.images[0]?.url || "https://via.placeholder.com/150"}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={track.name}
                                    secondary={track.artists.map((artist) => artist.name).join(", ")}
                                />
                                <IconButton
                                    edge="end"
                                    aria-label="add"
                                    onClick={() => handleAddition(track.uri)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <Typography variant="h4" gutterBottom>
                    Loading...
                </Typography>
            )}
        </Box>
    );
};

export default Recommendations;