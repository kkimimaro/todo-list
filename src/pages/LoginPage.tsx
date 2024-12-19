import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { Box, Typography, Button } from '@mui/material';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (response: any) => {
        if (response && response.credential) {
            const user = JSON.parse(atob(response.credential.split('.')[1])); // Декодирование JWT
            console.log('User:', user);
            localStorage.setItem('user', JSON.stringify(user)); // Сохранение данных в LocalStorage
        } else {
            console.error('Missing credential in response:', response);
        }
        navigate('/');
    };

    const handleLoginFailure = () => {
        console.error('Login Failed:');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#f0f4f8',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome to ToDo List App
            </Typography>
            <GoogleOAuthProvider clientId="833876740651-5mcnhggreu2pul7m5heqhghu369t82pu.apps.googleusercontent.com">
                <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
            </GoogleOAuthProvider>
        </Box>
    );
};

export default LoginPage;
