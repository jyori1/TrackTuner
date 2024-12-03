import React from 'react'
import Spotify from "../Spotify.js";
import Playlists from './Playlists.js';

const Home = () => {

  return (
    <div>
      <h1>Home</h1>
      <h3>Any private playlists will not be displayed below.</h3>
      <Playlists/>
    </div>

  )
}

export default Home