import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { returnUserType } from './Users';
import ButtonAppBar from './ButtonAppBar';
import AgentDashboard from './AgentDashboard';
import ClientDashboard from './ClientDashboard';


const Dashboard = () => {
    const location = useLocation();
    const user = location.state.username
    const userType = returnUserType(user);

    return (
        <div>
            <div>
                <ButtonAppBar />
                <Typography variant="h4">
                    Dashboard
                </Typography>

                <Typography variant="h6">
                    Welcome, {user}.
                    <br />
                    Type: {userType}
                    <br />
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