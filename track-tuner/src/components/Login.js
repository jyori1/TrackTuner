import React from 'react'
import Spotify from '../Spotify.js'

const Login = () => {
    const signup = () => {
        Spotify.getUserId().then((newUserData) => {
            console.log(newUserData)
        })
    }
    return (
        <div>
            <h1>Sign Up</h1>
            <button className="btn" onClick={() => signup()}>Sign Up!</button>
        </div>
    )
}

export default Login