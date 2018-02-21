import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {
    List,
    Divider
} from 'semantic-ui-react'

import Home from './screens/Home'
import Settings from  './screens/Settings'


const Dashboard = ({ match }) => (
    <div>

        <header>
            <List>
                <List.Item><Link to={`${match.url}/home`}>Home</Link></List.Item>
                <List.Item><Link to={`${match.url}/settings`}>Settings</Link></List.Item>
            </List>
        </header>
        <Divider/>

        <main>
            <Switch>
                <Route exact path={`${match.url}`} component={Home} />
                <Route exact path={`${match.url}/home`} component={Home} />
                <Route exact path={`${match.url}/settings`} component={Settings} />
            </Switch>
        </main>
    </div>
);


export default Dashboard;