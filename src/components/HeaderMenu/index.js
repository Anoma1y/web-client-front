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
                            <Grid.Column width={6} floated={"left"}>
                                <Menu className={"menu__color user__menu menu__title"}>
                                    <Menu.Item>
                                        <Link to={"/dashboard/"}>
                                            TransCrypt {localStorage.jwt ? `account ${email}` : null}
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                             <Grid.Column width={4} floated={"right"}>
                                 <Menu className={"menu__color user__menu user__menu_right"}>
                                     <Menu.Item className={"user__menu_item user__menu-logout"}>
                                         <Link to={"/logout"} >
                                             {localStorage.jwt ? "Log out" : null}
                                         </Link>
                                     </Menu.Item>
                                 </Menu>
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
