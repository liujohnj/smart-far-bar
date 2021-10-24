import { useState } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MyRealtors from "./MyRealtors";
import MyListedProperties from "./MyListedProperties";
import AllPublicListings from './AllPublicListings';


const ClientDashboard = (props) => {
    const user = props.user

    const [isAgencyUpdated, setIsAgencyUpdated] = useState(false);
    const [isListingsUpdated, setIsListingsUpdated] = useState(false);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    ml: 2,
                    mr: 2,
                    mt: 3,
                }}
            >
                <Box
                    sx=
                        {{
                            flexGrow: 1,
                            alignItems: 'center',
                        }}
                >
                    <Typography variant="subtitle1">
                        My Realtors
                    </Typography>
                </Box>
            </Box>
            <MyRealtors user={user} updateComponent={ {isAgencyUpdated, setIsAgencyUpdated} } />

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    My Listed Properties
                </Typography>
                <MyListedProperties user={user} updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} />
            </Box>

            <Box
                sx={{
                    ml: 0,
                    mr: 0,
                    mt: 3,
                }}
            >
                <Typography variant="subtitle1" sx={{ml:2, mb:1}} >
                    All Public Listings
                </Typography>
                <AllPublicListings updateListingsComponent={{isListingsUpdated, setIsListingsUpdated}} />
            </Box>
        </div>
    )
}


export default ClientDashboard;