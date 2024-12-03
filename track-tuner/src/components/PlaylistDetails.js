import React, { useState, useEffect } from "react";
import Spotify from "../Spotify.js";
import { useParams } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";

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

                    {playlist.images?.[0]?.url && (
                        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            <CardMedia
                                component="img"
                                image={playlist.images[0].url}
                                alt={playlist.name}
                                sx={{
                                    width: "50%",
                                    height: "auto",
                                    borderRadius: "8px",
                                }}
                            />
                        </Box>
                    )}

                    <Typography variant="h6" gutterBottom>
                        Tracks:
                    </Typography>
                    <Grid container spacing={2}>
                        {playlist.tracks.items.map((item) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.track.id}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={item.track.album.images?.[0]?.url || "https://via.placeholder.com/150"}
                                        alt={item.track.name}
                                        sx={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "contain",
                                        }}
                                    />
                                    <CardContent sx={{ textAlign: "center", padding: "10px" }}>
                                        <Typography
                                            variant="body1"
                                            sx={{ fontWeight: 500, wordWrap: "break-word" }}
                                        >
                                            {item.track.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ fontWeight: 400 }}
                                        >
                                            {item.track.artists.map((artist) => artist.name).join(", ")}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: "center", padding: "10px" }}>
                                        <Button
                                            size="small"
                                            color="primary"
                                            href={item.track.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Play on Spotify
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (
                <Typography variant="body1">Loading...</Typography>
            )}
        </Box>
    );
};

export default PlaylistDetails;