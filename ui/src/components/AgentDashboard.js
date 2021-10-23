import { useState } from 'react';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddClientDialog from "./AddClientDialog";
import MyAgencies from "./MyAgencies";

const AgentDashboard = (props) => {
    const user = props.user;

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
            <MyAgencies user={user} updateComponent={ {isAgencyUpdated, setIsAgencyUpdated} } />
        </div>
    )
}

export default AgentDashboard;