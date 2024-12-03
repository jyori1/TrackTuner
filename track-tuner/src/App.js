import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './components/Login.js';
import Home from './components/Home.js';
import PlaylistDetails from './components/PlaylistDetails.js';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
                    </Routes>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
