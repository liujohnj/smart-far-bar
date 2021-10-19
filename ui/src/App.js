import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import TestWorkflow from './components/TestWorkflow';
import CreateListing from './components/CreateListing';

const App = () => {
    return (
        <div>
            <Router>        
                <Switch>
                    <Route exact path="/">
                        <TestWorkflow />
                    </Route>
                    <Route path="/list">
                        <CreateListing />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
