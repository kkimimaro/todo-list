import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { blueGrey, teal } from '@mui/material/colors';
import { Navigate } from 'react-router-dom';

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('user');
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = createTheme({
        palette: {
            mode: mode,
            primary: teal,
            secondary: blueGrey,
        },
        typography: {
            fontFamily: 'Poppins, Arial, sans-serif',
        },
    });

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={isAuthenticated ? <HomePage onToggleTheme={toggleTheme} /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

//<ThemeProvider theme={theme}>
//<CssBaseline />
//<HomePage onToggleTheme={toggleTheme} />
//</ThemeProvider>


export default App;
