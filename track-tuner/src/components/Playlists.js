import React, { useState, useEffect } from "react";
import Spotify from "../Spotify.js";
import { Card, CardActions, CardContent, CardMedia, Typography, Button, Grid, Box } from "@mui/material";

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const data = await Spotify.getUserPlaylists();
                setPlaylists(data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };

        fetchPlaylists();
    }, []);

    return (
        <Box sx={{ padding: "20px", minHeight: "100vh", overflowY: "auto" }}>
            <Typography variant="h4" gutterBottom>
                Your Playlists
            </Typography>
            {playlists.length > 0 ? (
                <Grid container spacing={2}>
                    {/* Custom card for creating a new playlist */}
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                height: "100%",
                                border: "2px dashed #aaa",
                                justifyContent: "center",
                            }}
                        >
                            <CardMedia
                                sx={{
                                    width: "60%",
                                    height: "auto",
                                }}
                                component="img"
                                image="https://via.placeholder.com/150?text=+" // Placeholder for "Create" icon or custom image
                                alt="Create New Playlist"
                            />
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 500, textAlign: "center" }}
                                >
                                    Create New Playlist
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        console.log("Create new playlist clicked"); // Replace with your handler
                                    }}
                                >
                                    Create
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    {/* Loop through the playlists */}
                    {playlists.map((playlist) => (
                        <Grid item xs={12} sm={6} md={3} lg={2} key={playlist.id}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <CardMedia
                                    sx={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "contain",
                                    }}
                                    component="img"
                                    image={playlist.images?.[0]?.url || "https://via.placeholder.com/150"}
                                    title={playlist.name}
                                />
                                <CardContent sx={{ textAlign: "center", padding: "10px" }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 500, wordWrap: "break-word" }}
                                    >
                                        {playlist.name}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: "center", padding: "10px" }}>
                                    <Button
                                        size="small"
                                        color="primary"
                                        href={playlist.external_urls.spotify}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open in Spotify
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>Loading playlists...</Typography>
            )}
        </Box>
    );
};

export default Playlists;