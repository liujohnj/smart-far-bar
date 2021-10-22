import { useLocation } from "react-router-dom";
import Typography from '@mui/material/Typography';
import MyContacts from './MyContacts';

const Dashboard = () => {
    const location = useLocation();
    const user = location.state.username

    // Demo substitute for DB user lookup
    const roles = {
        'Alice' : 'seller',
        'Bob' : 'buyer',
        'Carol' : 'buyerAgent',
        'David' : 'sellerAgent',
    }

    const userRole = roles[user]


    
    return (
        <div>
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Typography variant="h6">
                Welcome, {user}.
                <br />
                Role: {userRole}
            </Typography>

            <MyContacts user='Alice' />

            
        </div>
    )
}

export default Dashboard;