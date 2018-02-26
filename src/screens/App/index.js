import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'screens/Home';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import SignupSuccess from 'screens/SignupSuccess';
import Dashboard from 'screens/Dashboard';
import ResetPassword from 'screens/ResetPassword';
import HeaderMenu from 'components/HeaderMenu';
import { Link } from 'react-router-dom'
import {
    Icon,
    Menu,
    Sidebar
} from "semantic-ui-react";
import VerificationUser from "screens/SignupSuccess/confirm";
import CheckToken from './CheckToken';
import Logout from './Logout';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarVisible: false
        };
    }

    toggleVisibility = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
    
    render () {
        return (
            <div className={"dashboard__header"} >
                <CheckToken />
                <Sidebar.Pushable style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                    <Sidebar
                        as={Menu}
                        animation='push'
                        direction='right'
                        visible={this.state.isSidebarVisible}
                        icon='labeled'
                        width={"thin"}
                        vertical
                        inverted
                    >
                        <Link to={'/dashboard'}>
                            <Menu.Item name='home'>
                                <Icon name='home' />
                                Title
                            </Menu.Item>
                        </Link>
                        <Link to={'/'}>
                            <Menu.Item name='mail'>
                                <Icon name='mail' />
                                Title
                            </Menu.Item>
                        </Link>
                        <Link to={'/dashboard/settings'}>
                            <Menu.Item name='setting' >
                                <Icon name='setting' />
                                Title
                            </Menu.Item>
                        </Link>
                    </Sidebar>
                    <Sidebar.Pusher style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, overflowY: "scroll" }}>
                            <main>
                                <HeaderMenu toggleSidebar={this.toggleVisibility.bind(this)}/>
                                <Switch>
                                    <Route exact path={'/'} component={Home} />
                                    <Route exact path={'/login'} component={Login} />
                                    <Route exact path={'/signup'} component={Signup} />
                                    <Route exact path={'/signupsuccess'} component={SignupSuccess} />
                                    <Route path={'/dashboard'} component={localStorage.jwt ? Dashboard : null} />
                                    <Route path={'/reset'} component={ResetPassword} />
                                    <Route path={'/logout'} component={Logout} />
                                    <Route path={'/confirm'} component={VerificationUser} />
                                </Switch>
                            </main>

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}
export default App;
