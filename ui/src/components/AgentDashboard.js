import { useState } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddClientDialog from "./AddClientDialog";
import MyClients from "./MyClients";
import MyListings from './MyListings';

const AgentDashboard = (props) => {
    const user = props.user;

    const [isAgencyUpdated, setIsAgencyUpdated] = useState(false);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: 2,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Box
                    sx=
                        {{
                            flexGrow: 1,
                            
                        }}
                >
                    <Typography variant="subtitle1">
                        My Clients
                    </Typography>
                </Box>
                <Box>
                    <AddClientDialog user={user} updateComponent={ {isAgencyUpdated, setIsAgencyUpdated} }/>
                </Box>
            </Box>
            <Box>
                <MyClients user={user} updateComponent={ {isAgencyUpdated, setIsAgencyUpdated} } />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Listings
                </Typography>
                <MyListings user={user}/>
            </Box>
            
        </div>
    )
}

export default AgentDashboard;