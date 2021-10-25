import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Paper, Box, Modal, Typography } from '@mui/material';

import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import InfoIcon from '@mui/icons-material/Info';

import Login from './components/Login';
import TestWorkflow from './components/TestWorkflow';
import Dashboard from './components/Dashboard';
import ListingForm from './components/ListingForm';
import InfoDialog from './components/InfoDialog';


const App = (props) => {

    const [value, setValue] = useState(99);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (value === 0) {
            setValue(99);
            setOpen(true)
        } else if (value === 2) {
            setValue(99);
            window.location.href = "mailto:johnliu@ufl.edu";
        }
    },[value, open])

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            </Router>

            <Box sx={{}}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={0}>
                        <BottomNavigation
                            showLabels
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            >
                            <BottomNavigationAction label="info" icon={<InfoIcon />} />
                            {open && <InfoDialog openProp={{open, setOpen}} /> }

                            <BottomNavigationAction label="email" icon={<EmailIcon />} />   
                        </BottomNavigation>
                    </Paper>
            </Box>
        </div>
    );
}

export default App;
