import React from 'react';
import { Link } from 'react-router-dom'
import {
    Menu
} from 'semantic-ui-react'

const HeaderMenuItem = ({href, LinkName}) => (
    <Menu.Item name={LinkName} className={"header__menu_item"}>
        <Link to={href} >{LinkName} </Link>
    </Menu.Item>
)
export default HeaderMenuItem;
