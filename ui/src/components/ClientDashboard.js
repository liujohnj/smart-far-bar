import { useState } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import MyRealtors from "./MyRealtors";

const ClientDashboard = (props) => {
    const user = props.user

    const [isAgencyUpdated, setIsAgencyUpdated] = useState(false);

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
        </div>
    )
}


export default ClientDashboard;