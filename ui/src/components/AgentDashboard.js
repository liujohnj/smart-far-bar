import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddClientDialog from "./AddClientDialog";
import MyContacts from "./MyContacts";

const AgentDashboard = (props) => {
    const user = props.user



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
                    <AddClientDialog />
                </Box>
            </Box>
            <MyContacts user={user} />
        </div>
    )
}

export default AgentDashboard;