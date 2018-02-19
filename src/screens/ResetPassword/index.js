import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { List, Divider } from 'semantic-ui-react'

import Email from './screens/Email'
import Password from  './screens/Password'


const ResetPassword = ({ match }) => (
    <div>
        <header>
            <List>
                <List.Item><Link to={`${match.url}/email`}>Sending Mail</Link></List.Item>
                <List.Item><Link to={`${match.url}/password`}>Reset password</Link></List.Item>
            </List>
        </header>
        <Divider/>

        <main>
            <Switch>
                <Route exact path={`${match.url}`} component={Email} />
                <Route exact path={`${match.url}/email`} component={Email} />
                <Route exact path={`${match.url}/password`} component={Password} />
            </Switch>
        </main>
    </div>
);


export default ResetPassword;