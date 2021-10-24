import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import ButtonAppBar from './ButtonAppBar';

const Login = () => {
    
    const [username, setUsername] = useState('');
   
    const handleChange = (event) => {
        const name = event.target.value
        setUsername(name);

        localStorage.setItem('user', name);
        history.push({
            pathname: '/dashboard',
            state: { name }
        });
      };

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('user', username);
        history.push({
            pathname: '/dashboard',
            state: { username }
        });
    }
    
    return (
        <div>
            <ButtonAppBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        mt: 4,
                    }}
                >
                    <Typography variant="h4" color="primary" sx={{ mb:5 }}>
                        Login
                    </Typography>       
                </Box>
                
                <Box>
                    <form onSubmit={handleSubmit}> 
                        <FormControl>
                            <Box fullWidth
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'background.paper',
                                }}
                            >
                                <Box>
                                    <InputLabel id="demo-simple-select-label">Username</InputLabel>
                                </Box>

                                <Box>
                                    <Select sx={{ minWidth: 200 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={username}
                                        label="Username"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value='Alice'>
                                            Alice (Seller)
                                        </MenuItem>
                                        <MenuItem value='Bob'>
                                            Bob (Buyer)
                                        </MenuItem>
                                        <MenuItem value='Carol'>
                                            Carol (Buyer's Agent)
                                        </MenuItem>
                                        <MenuItem value='David'>
                                            David (Seller's Agent)
                                        </MenuItem>
                                    </Select>
                                </Box>

                                <Box>
                                    <IconButton color="primary" type="submit">
                                        <LoginIcon
                                            sx={{
                                                fontSize: 45,
                                            }}
                                        />
                                    </IconButton>           
                                </Box>
                            </Box>
                        </FormControl>
                    </form>
                </Box>
            </Box>
        </div>
    )
}

export default Login;