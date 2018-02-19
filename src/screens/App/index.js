import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import { List, Divider } from 'semantic-ui-react'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Signup from 'screens/Signup'
import Dashboard from 'screens/Dashboard'
import ResetPassword from 'screens/ResetPassword'

const App = (props) => (
    <div>
        <header>
            <List>
                <List.Item><Link to={'/'}>Home</Link></List.Item>
                <List.Item><Link to={'/login'}>Login</Link></List.Item>
                <List.Item><Link to={'/signup'}>Signup</Link></List.Item>
                <List.Item><Link to={'/reset'}>Reset</Link></List.Item>
                <List.Item><Link to={'/dashboard'}>Dashboard</Link></List.Item>
            </List>
        </header>
        <Divider/>

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