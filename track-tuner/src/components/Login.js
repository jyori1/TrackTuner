import React, { useState, useEffect } from "react";
import Spotify from "../Spotify.js";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const token = Spotify.getAccessToken();
        if (token) {
            Spotify.getUserId()
                .then((data) => {
                    setUserData(data);
                    navigate("/home");
                })
                .catch((error) => console.error("Error fetching user data:", error));
        }
    }, [navigate]);

    const signup = async () => {
        try {
            const newUserData = await Spotify.getUserId();
            setUserData(newUserData);
            navigate("/home");
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <div className="container">
            <div className="signup">
                <h1>Sign Up with Spotify</h1>
                <p>Discover your personalized playlists and more!</p>
                <button className="btn" type="button" onClick={signup}>
                    Sign Up with Spotify
                </button>
            </div>
        </div>
    );
};

export default Login;