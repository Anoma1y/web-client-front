import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'screens/Home';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import Dashboard from 'screens/Dashboard';
import ResetPassword from 'screens/ResetPassword';
import HeaderMenu from 'components/HeaderMenu';

const App = () => (
    <div className={"dashboard__header"} >
        <HeaderMenu />
        <main>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/signup'} component={Signup} />
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/reset'} component={ResetPassword} />
            </Switch>
        </main>
    </div>
);

export default App;