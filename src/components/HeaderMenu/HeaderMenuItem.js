import React from 'react';
import { Link } from 'react-router-dom'
import {
    Menu
} from 'semantic-ui-react'

const HeaderMenuItem = ({href, LinkName, activeLink}) => (
    <Menu.Item name={LinkName} className={activeLink === href ? "header__menu_item header__menu_item-active" : "header__menu_item"}>
        <Link to={href} >{LinkName} </Link>
    </Menu.Item>
)
export default HeaderMenuItem;
