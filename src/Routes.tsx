import React from "react";
import { 
    Route,
    BrowserRouter as Router, 
    Switch
} from 'react-router-dom';

import HomePage from "./pages/homepage";
import Studio from "./pages/studio";

const Routes = (): JSX.Element => (
    <Router>
        <Switch>
            <Route component={HomePage} exact path="/" />
            <Route component={Studio} exact path="/studio" />
        </Switch>
    </Router>
);

export default Routes;