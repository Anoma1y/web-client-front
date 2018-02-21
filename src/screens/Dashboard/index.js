import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {
    List,
    Divider,
    Container
} from 'semantic-ui-react'

import Home from './screens/Home'
import Settings from  './screens/Settings'


const Dashboard = ({ match }) => (
    <Container fluid>
        <Switch>
            <Route exact path={`${match.url}`} component={Home} />
            <Route exact path={`${match.url}/home`} component={Home} />
            <Route exact path={`${match.url}/settings`} component={Settings} />
        </Switch>
    </Container>
);


export default Dashboard;