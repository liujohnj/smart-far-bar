import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';


const Login = () => {

    const [username, setUsername] = useState('');
   
    const handleChange = (event) => {
        setUsername(event.target.value);
      };

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/dashboard',
            state: { username }
        });
    }
    
    return (
        <div>
            <Typography variant="h4" sx={{mb:5}}>Login</Typography>
            <Box sx={{ maxWidth: 250 }}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Username</InputLabel>
                        <Select
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
                                    Buyer (Bob)
                                </MenuItem>
                                <MenuItem value='Carol'>
                                    Carol (Buyer's Agent)
                                </MenuItem>
                                <MenuItem value='David'>
                                    Alice (Seller's Agent)
                                </MenuItem>
                               
                        </Select>
                        <IconButton color="primary" size="large" aria-label="login" type="submit">
                            <LoginIcon />
                        </IconButton>
                    </FormControl>
                </form>
            </Box>
        </div>
    )
}

export default Login;