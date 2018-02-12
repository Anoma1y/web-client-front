import React from 'react';
import { Route, Link } from 'react-router-dom';
import { List, Divider } from 'semantic-ui-react'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Signup from 'screens/Signup'

const App = () => (
    <div>
        <header>
            <List>
                <List.Item><Link to={'/'}>Home</Link></List.Item>
                <List.Item><Link to={'/login'}>Login</Link></List.Item>
                <List.Item><Link to={'/signup'}>Signup</Link></List.Item>
            </List>
        </header>
        <Divider/>
        <main>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/signup'} component={Signup} />
        </main>
    </div>
);

export default App;