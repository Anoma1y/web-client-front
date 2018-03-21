import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Home from './screens/Home';
import Settings from  './screens/Settings';
import NotFound from "screens/NotFound";

const Dashboard = ({ match }) => (
    <div>
        <Switch>
            <Route exact path={`${match.url}`} component={Home} />
            <Route exact path={`${match.url}/home`} component={Home} />
            <Route exact path={`${match.url}/settings`} component={Settings} />
            <Route component={ NotFound } />
        </Switch>
    </div>
);


export default Dashboard;