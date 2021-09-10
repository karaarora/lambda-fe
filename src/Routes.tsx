import React, { lazy, Suspense } from "react";
import { 
    Redirect, 
    Route,
    BrowserRouter as Router, 
    Switch
} from "react-router-dom";

import PageSkeleton from "./ui/Skeleton/PageSkeleton";

const HomePage = lazy(() => import("./pages/homepage"));
const Studio = lazy(() => import("./pages/studio"));

const Routes = (): JSX.Element => (
    <Router>
        <Suspense fallback={PageSkeleton}>
            <Switch>
                <Route component={HomePage} exact path="/" />
                <Route component={Studio} exact path="/studio" />
                <Route component={Studio} exact path="/studio/:memeId" />
                <Route render={() => <Redirect to={{pathname: "/"}} />} />
            </Switch>
        </Suspense>
    </Router>
);

export default Routes;