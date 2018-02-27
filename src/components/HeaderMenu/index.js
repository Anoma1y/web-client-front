import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Menu,
    Icon,
    Container,
    Grid
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from 'logo.svg';
// import HeaderMenuItem from './HeaderMenuItem';

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
        const { toggleSidebar } = this.props;
        return (
                <Menu className={"header__menu"}>
                    <Container>
                        <Grid className={"grid__menu"}>
                            <Grid.Row>
                                <Grid.Column width={1}>
                                </Grid.Column>
                                <Grid.Column floated={"left"} className={"logo_content"} width={3}>
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
                                                <Link to={"/settings"} >
                                                    mail@mail.ru
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
{/*<Menu.Item className={"header__menu_logo"}>*/}
    {/*<a href={"http://www.google.com"}>*/}
        {/*<img src={Logo} alt="Logo" />*/}
    {/*</a>*/}
{/*</Menu.Item>*/}
{/*<Menu.Item>*/}
{/*{localStorage.jwt ?*/}
    {/*<Menu.Item>*/}
        {/*<Menu.Item name={"Settings"}>*/}
            {/*<Link to={"/settings"} >*/}
                {/*mail@mail.ru*/}
            {/*</Link>*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item name={"logout"}>*/}
            {/*<Link to={"/logout"} >*/}
                {/*Log out*/}
            {/*</Link>*/}
        {/*</Menu.Item>*/}
    {/*</Menu.Item>*/}
    {/*: null}*/}
{/*</Menu.Item>*/}
export default connect(state => ({ routing: state.routing }), {

})(HeaderMenu);
