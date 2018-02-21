import React, { Component } from 'react';
import {
    Menu
} from 'semantic-ui-react';
import Logo from 'logo.svg';
import HeaderMenuItem from './HeaderMenuItem';

class HeaderMenu extends Component {
    state = {
        menu: [{
            name: "Home",
            href: "/"
        },{
            name: "Login",
            href: "/login"
        },{
            name: "Signup",
            href: "/signup"
        },{
            name: "Reset",
            href: "/reset"
        },{
            name: "Dashboard",
            href: "/dashboard/"
        },{
            name: "Settings",
            href: "/dashboard/settings"
        }]
    }
    render() {
        const { menu } = this.state;
        return (
            <Menu stackable className={"header__menu"}>
                <Menu.Item className={"header__menu_logo"}>
                    <a href={"#"}>
                        <img src={Logo} alt="Logo" />
                    </a>
                </Menu.Item>
                {
                    menu.map((item, i) => {
                        return (
                            <HeaderMenuItem key={i} LinkName={item["name"]} href={item["href"]}/>
                        )
                    })
                }
            </Menu>
        );
    }
}

export default HeaderMenu;
