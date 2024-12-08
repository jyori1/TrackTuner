const clientId = process.env.REACT_APP_SPOTIFY_API_KEY;
const redirectUri = encodeURIComponent("http://localhost:8080/")
const scopes = encodeURIComponent("user-read-private user-read-email playlist-modify-public user-top-read playlist-modify-private")
let accessToken
const Spotify = {
    getAccessToken: () => {
        if (accessToken) {
            return accessToken;
        }
        const hash = window.location.hash
            .substring(1)
            .split("&")
            .reduce((initial, item) => {
                let parts = item.split("=");
                initial[parts[0]] = decodeURIComponent(parts[1]);
                return initial;
            }, {});

        accessToken = hash.access_token;

        if (accessToken) {
            window.history.pushState("", document.title, window.location.pathname);
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            return accessToken;
        }

        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
        window.location = accessUrl;
    },
    getUserId: () => {
        accessToken = Spotify.getAccessToken()
        if (accessToken) {
            const headers = { Authorization: `Bearer ${accessToken}` }
            return fetch("https://api.spotify.com/v1/me", { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {            
                if (jsonResponse) {
                    const { id, display_name, email, external_urls, images } = jsonResponse
                    const profile = {
                        user_id: id,
                        email: email,
                        name: display_name,
                        image: images[0].url,
                        url: external_urls.spotify
                    }
                    return profile
                }
            })
        }
    },
    search : (term) => {
        accessToken = Spotify.getAccessToken()
        if (accessToken) {
            const headers = {Authorization: `Bearer ${accessToken}`}
            return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers})
            .then(response => { return response.json() })
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return []
                }
                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    image: track.album.images[1].url,
                    uri: track.uri
                }))
            })
        }
    },
    getUserPlaylists: async () => {
        accessToken = Spotify.getAccessToken();
        if (accessToken) {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                const userId = await Spotify.getUserId();
                if (!userId) {
                    throw new Error("User ID not found.");
                }

                const response = await fetch(`https://api.spotify.com/v1/users/${userId.user_id}/playlists`, { headers });
                const data = await response.json();

                return data.items || [];
            } catch (error) {
                console.error("Error fetching playlists:", error);
                return [];
            }
        }
    },
    getPlaylist: async (playlistId) => {
        accessToken = Spotify.getAccessToken();
        if (accessToken) {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });
                const data = await response.json();

                return data;
            } catch (error) {
                console.error("Error fetching playlist details:", error);
            }
        }
    },
    deleteFromPlaylist: async (playlistId, trackId) => {
        accessToken = Spotify.getAccessToken();
        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: "DELETE",
                    headers,
                    body: JSON.stringify({ tracks: [{ uri: `spotify:track:${trackId}` }] }),
                });
                const data = await response.json();

                return data;
            } catch (error) {
                console.error("Error deleting track from playlist:", error);
            }
        }
    },
    addToPlaylist: async (playlistId, trackUri) => {
        accessToken = Spotify.getAccessToken();
        if (accessToken) {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({ uris: [trackUri] }),
                });
                const data = await response.json();

                return data;
            } catch (error) {
                console.error("Error adding track to playlist:", error);
            }
        }
    },
    getTopSongs: async () => {
        accessToken = Spotify.getAccessToken();
        if (accessToken) {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                const response = await fetch("https://api.spotify.com/v1/me/top/tracks", { headers });
                const data = await response.json();

                return data.items || [];
            } catch (error) {
                console.error("Error fetching top songs:", error);
                return [];
            }
        }
    },
    createPlaylist: async (fields) => {
        accessToken = Spotify.getAccessToken();
        if (accessToken){
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            };
            const { name, description, isPrivate } = fields;

            try{
                const userId = await Spotify.getUserId();
                if (!userId) {
                    throw new Error("User ID not found.");
                }
                const creating = await fetch(`https://api.spotify.com/v1/users/${userId.user_id}/playlists`, {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        name, 
                        description: description || "", 
                        public: !isPrivate, 
                    }),
                });

                if (!creating.ok){
                    throw new Error ("Error making playlist")
                }
                const data = await creating.json()
                console.log(data)
                return data

            } catch(e){
                console.error("Error creating playlist:", e);
                return;
            }




        }

    }
}

export default Spotify