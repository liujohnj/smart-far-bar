import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const ButtonAppBar = (props) => {
    
    const [loggedInUser, setLoggedInUser] = useState('');
    
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('user'));
    }, []);

    const history = useHistory();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.setItem('user', '')
        history.push({
            pathname: '/',
        });
    }

    console.log("storage: ", localStorage.getItem('user'))
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        smart-far-bar
                    </Typography>
                    <Button
                        color="inherit"
                        disabled={!loggedInUser}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
  );
}

export default ButtonAppBar;