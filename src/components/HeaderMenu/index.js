import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Menu,
    Container,
    Grid
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from 'logo.svg';

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [{
                name: "Home",
                href: "/dashboard/",
                iconName: "home"
            },{
                name: "Message",
                href: "/",
                iconName: "envelope"
            },{
                name: "Settings",
                href: "/dashboard/settings",
                iconName: "setting"
            }]
        };
    }
    render() {
        const { email } = this.props.user;
        return (
            <Menu className={"header__menu"}>
                <Container>
                    <Grid className={"grid__menu"}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                            </Grid.Column>
                            <Grid.Column floated={"left"} className={"logo_content"} width={4}>
                                <Menu className={"menu__color"}>
                                    <Menu.Item>
                                        <Link to={"/dashboard/"}>
                                            <img src={Logo} alt="Logo" />
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                            <Grid.Column floated={"right"} width={6}>
                                {localStorage.jwt ?
                                    <Menu className={"menu__color user__menu"}>
                                        <Menu.Item className={"user__menu_item user__menu-email"}>
                                            <Link to={"/dashboard/settings"} >
                                                {email}
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item className={"user__menu_item user__menu-logout"}>
                                            <Link to={"/logout"} >
                                                Log out
                                            </Link>
                                        </Menu.Item>
                                    </Menu>
                                : null}
                            </Grid.Column>
                            <Grid.Column width={1}>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Menu>
        );
    }
}
export default connect(state => ({ routing: state.routing, user: state.user }), {

})(HeaderMenu);
