import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import {
    Menu,
    Container
} from 'semantic-ui-react'
import Home from 'screens/Home'
import Login from 'screens/Login'
import Signup from 'screens/Signup'
import Dashboard from 'screens/Dashboard'
import ResetPassword from 'screens/ResetPassword'
import Logo from 'logo.svg'

const App = () => (
    <Container fluid>
        <Menu stackable style={{backgroundColor: "#001f38"}}>
            <Menu.Item>
                <a href={"#"}>
                    <img src={Logo} alt="Logo" style={{width: "100px"}}/>
                </a>
            </Menu.Item>
            <Menu.Item name='Home'>
                <Link to={"/"} > Home </Link>
            </Menu.Item>
            <Menu.Item name='Login'>
                <Link to={"/login"} > Login </Link>
            </Menu.Item>
            <Menu.Item name='Signup'>
                <Link to={"/signup"} > Signup </Link>
            </Menu.Item>
            <Menu.Item name='Reset'>
                <Link to={"/reset"} > Reset </Link>
            </Menu.Item>
            <Menu.Item name='Dashboard'>
                <Link to={"/dashboard/"} > Dashboard </Link>
            </Menu.Item>
            <Menu.Item name='Settings'>
                <Link to={"/dashboard/settings"} > Settings </Link>
            </Menu.Item>
        </Menu>
        <main>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/login'} component={Login} />
                <Route exact path={'/signup'} component={Signup} />
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/reset'} component={ResetPassword} />
            </Switch>
        </main>
    </Container>
);

export default App;