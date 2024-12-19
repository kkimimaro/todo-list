import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Avatar, Button } from '@mui/material';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import TodoList from '../components/TodoList.tsx';
import utf8 from 'utf8';

interface HomePageProps {
    onToggleTheme: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onToggleTheme }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const decodeName = (name: string) => {
        try {
            return utf8.decode(name);
        } catch (error) {
            console.error('Error decoding name:', error);
            return name;
        }
    };

    const decodedName = user ? decodeName(user.name) : null;


    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ToDo List
                </Typography>
                <IconButton color="inherit" onClick={onToggleTheme}>
                    <Brightness4 />
                </IconButton>
            </Toolbar>
        </AppBar>

        <Box sx={{ padding: 10, textAlign: 'center' }}>
            <Avatar
                src={user.picture}
                alt={decodedName}
                sx={{ width: 80, height: 80, margin: '0 auto' }}
            />
            <Typography variant="h5" sx={{ mt: 2 }}>
                Welcome, {user.name}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Email: {user.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                <TodoList />
            </Typography>
            <Button onClick={handleLogout} variant="contained" color="secondary">
                Logout
            </Button>
        </Box>
        </>
    );
};

export default HomePage;
