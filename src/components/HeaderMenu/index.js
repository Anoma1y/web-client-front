import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Menu
} from 'semantic-ui-react';
import Logo from 'logo.svg';
import HeaderMenuItem from './HeaderMenuItem';
import HomeIcon from './Icon/HomeIcon';
import SettingsIcon from './Icon/SettingsIcon';
import MessageIcon from './Icon/MessageIcon';

class HeaderMenu extends Component {
    state = {
        menu: [{
            name: "Home",
            href: "/dashboard/",
            image: HomeIcon
        },{
            name: "MessageIcon",
            href: "/",
            image: MessageIcon
        },{
            name: "Settings",
            href: "/dashboard/settings",
            image: SettingsIcon
        }]
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
                { menu.map((item, index) => <HeaderMenuItem key={index} LinkName={item["name"]} href={item["href"]} activeLink={pathname} iconLink={item["image"]}/> )}
            </Menu>
        );
    }
}


export default connect(state => ({ routing: state.routing }), {

})(HeaderMenu);
