import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TestWorkflow from './components/TestWorkflow';
import CreateListing from './components/CreateListing';
import RealtorDashboard from './components/RealtorDashboard';
import SellerDashboard from './components/SellerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import ClientDashboard from './components/BuyerDashboard';
import AgentDashboard from './components/BuyerDashboard';


const App = () => {
    return (
        <div>
            <Router>        
                <Switch>
                    <Route exact path="/">
                        <TestWorkflow />
                    </Route>
                    <Route path="/client">
                        <ClientDashboard />
                    </Route>
                    <Route path="/client">
                        <AgentDashboard />
                    </Route>
                    <Route path="/list">
                        <CreateListing />
                    </Route>
                    <Route path="/realtor">
                        <RealtorDashboard />
                    </Route>
                    <Route path="/seller">
                        <SellerDashboard />
                    </Route>
                    <Route path="/buyer">
                        <BuyerDashboard />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
