import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import daml from './daml.png'

//'C:/Users/john/Projects/daml/smart-far-bar/ui/public/daml.png'

//C:\Users\john\Projects\daml\smart-far-bar\ui\src\components\ButtonAppBar.js
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

    
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Smart FAR-BAR
                        </Typography>

                        <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Box>
                                <Typography sx={{ alignItems: 'center', mr: 1}}>
                                    Powered by
                                </Typography>
                            </Box>
                            <Box>
                                <img src={daml} height="18" alt="daml logo" />
                            </Box>
                        </Box>
                        <Button sx={{ml: 5}}
                            color="inherit"
                            disabled={!loggedInUser}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
  );
}

export default ButtonAppBar;