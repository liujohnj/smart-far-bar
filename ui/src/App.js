import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Login from './components/Login';
import TestWorkflow from './components/TestWorkflow';
import Dashboard from './components/Dashboard';


const App = () => {

    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/test">
                        <TestWorkflow />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
