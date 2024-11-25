import React from 'react'
import Spotify from '../Spotify.js'
import './Login.css'

const Login = () => {
    const signup = async () => {
        try {
            const newUserData = await Spotify.getUserId();
            console.log(newUserData);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
    }
    return (
        <div className="container">
            <div className="signup">
                <h1>Sign Up with Spotify</h1>
                <p>Discover your personalized playlists and more!</p>
                <button className="btn" onClick={signup}>
                    Sign Up with Spotify
                </button>
            </div>
        </div>
    )
}

export default Login