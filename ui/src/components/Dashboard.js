import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { returnUserType, returnUserToken, returnUserRole } from './Users';
import ButtonAppBar from './ButtonAppBar';
import AgentDashboard from './AgentDashboard';
import ClientDashboard from './ClientDashboard';


const Dashboard = () => {
    const location = useLocation();
    const username = location.state.name

    // Back-end server substitute for demo purposes
    const userType = returnUserType(username);
    const userToken = returnUserToken(username);
    const userRole = returnUserRole(username);
    const user = {username, userType, userRole, userToken}


    return (
        <div>
            <div>
                <ButtonAppBar />
                <Typography variant="h5" color="primary"
                    sx={{
                        m: 2,
                    }}
                >
                    {userType} Dashboard
                </Typography>

                <Typography variant="body1"
                    sx={{
                        ml: 4,
                        mb: 2,
                    }}
                >
                    <em>Welcome, {username}.</em>
                </Typography>
            </div>

            <div>
                {userType==="Realtor" && <AgentDashboard user={user} />}
                {userType==="Client" && <ClientDashboard user={user} />}
            </div>
            
        </div>
    )
}

export default Dashboard;