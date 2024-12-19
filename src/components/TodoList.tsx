import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Paper } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

const TodoList: React.FC = () => {
    const { enqueueSnackbar } = useSnackbar();
    
    const [tasks, setTasks] = useState<string[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [task, setTask] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (task.trim()) {
            setTasks([...tasks, task.trim()]);
            enqueueSnackbar('Task added!', { variant: 'success' });
            setTask('');
        }
    };
    
    const removeTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
        enqueueSnackbar('Task removed!', { variant: 'error' });
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: '0 auto',
                padding: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 700, textAlign: 'center' }}>
                My ToDo List
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    label="Enter a new task"
                    variant="outlined"
                />
                <Button
                    onClick={addTask}
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    Add
                </Button>
            </Box>
            <Paper elevation={2}>
                <List>
                    {tasks.map((t, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" color="error" onClick={() => removeTask(index)}>
                                    <Delete />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={t} />
                        </ListItem>
                    ))}
                </List>
                {tasks.length === 0 && (
                    <Typography sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                        No tasks yet. Start by adding one!
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default TodoList;
