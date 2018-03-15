import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Users from './screens/Users';
import Application from  './screens/Application';
import ApplicationSingle from 'components/Admin/ApplicationSingle';
import UserSingle from 'components/Admin/UserSingle';
import AdminMenu from 'components/Admin/AdminMenu';

const Admin = ({ match }) => (
    <div>
        <AdminMenu />
        <Switch>
            <Route exact path={`${match.url}/`} component={Users} />
            <Route exact path={`${match.url}/application`} component={Application} />
            <Route exact path={`${match.url}/application/:id`} component={ApplicationSingle}/>
            <Route exact path={`${match.url}/user/:id`} component={UserSingle}/>
        </Switch>
    </div>
);


export default Admin;