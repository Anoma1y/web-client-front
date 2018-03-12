import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Users from './screens/Users';
import Application from  './screens/Application';
import AdminMenu from 'components/Admin/AdminMenu';

const Admin = ({ match }) => (
    <div>
        <AdminMenu />
        <Switch>
            <Route exact path={`${match.url}/`} component={Users} />
            <Route exact path={`${match.url}/application`} component={Application} />
        </Switch>
    </div>
);


export default Admin;