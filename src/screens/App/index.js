import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'screens/Home';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import Dashboard from 'screens/Dashboard';
import ResetPassword from 'screens/ResetPassword';
import HeaderMenu from 'components/HeaderMenu';
import { Link } from 'react-router-dom'
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";

export default class App extends React.Component {
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
                                    <Route path={'/dashboard'} component={Dashboard} />
                                    <Route path={'/reset'} component={ResetPassword} />
                                </Switch>
                            </main>

                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     goToSettings: () => push('/dashboard/settings'),
// }, dispatch);
//
// export default connect(
//     null,
//     mapDispatchToProps
// )(App)