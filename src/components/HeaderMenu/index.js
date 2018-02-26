import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Menu,
    Icon
} from 'semantic-ui-react';
import Logo from 'logo.svg';
import HeaderMenuItem from './HeaderMenuItem';

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
        const { pathname } = this.props.routing.location;
        const { menu } = this.state;

        return (
                <Menu className={"header__menu"}>
                    <Menu.Item className={"header__menu_logo"}>
                        <a href={"http://www.google.com"}>
                            <img src={Logo} alt="Logo" />
                        </a>
                    </Menu.Item>
                    { menu.map((item, index) => <HeaderMenuItem key={index} LinkName={item["name"]} href={item["href"]} activeLink={pathname} iconName={item["iconName"]}/> )}
                    {localStorage.jwt ? <HeaderMenuItem LinkName={"Logout"} href={"/logout"} activeLink={pathname} iconName={"log out"}/> : null}
                    <Menu.Item className={"mobileMenu__trigger"}>
                        <Icon name={"bars"} onClick={this.props.toggleSidebar}/>
                    </Menu.Item>
                </Menu>
        );
    }
}

export default connect(state => ({ routing: state.routing }), {

})(HeaderMenu);
