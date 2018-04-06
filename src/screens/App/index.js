import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import SignupSuccess from 'screens/SignupSuccess';
import Dashboard from 'screens/Dashboard';
import ResetPassword from 'screens/ResetPassword';
import Admin from 'screens/Admin';
import HeaderMenu from 'components/HeaderMenu';
import VerificationUser from "screens/SignupSuccess/confirm";
import CheckToken from './CheckToken';
import Logout from './Logout';
import Redirect from './Redirect';
import NotFound from 'screens/NotFound/';

const App = () => {
    return (
        <main>
            <CheckToken />
            <HeaderMenu />
            <Switch>
                <Route exact path={'/'} component={Login} />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/signup'} component={Signup} />
                <Route exact path={'/signupsuccess'} component={SignupSuccess} />
                <Route path={'/dashboard'} component={localStorage.jwt ? Dashboard : Redirect } />
                {
                    localStorage.roles  === "admin" ?
                        <Route path={'/admin'} component={Admin}/>
                        : null
                }
                <Route path={'/reset'} component={ResetPassword} />
                <Route path={'/logout'} component={Logout} />
                <Route path={'/confirm'} component={VerificationUser} />
                <Route component={ NotFound } />
            </Switch>
        </main>
    )
};
export default App;
