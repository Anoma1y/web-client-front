import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {
    Menu
} from 'semantic-ui-react'
export class HeaderMenuItem extends Component {
    render(){
        const { href, LinkName, activeLink } = this.props;
        return (
            <Menu.Item name={LinkName} className={activeLink === href ? "header__menu_item header__menu_item-active" : "header__menu_item"}>
                <Link to={href} >
                    <this.props.iconLink/>
                </Link>
            </Menu.Item>
        )
    }
}

// const { href, LinkName, activeLink, iconLink } = this.props;
// return (
//     <Menu.Item name={LinkName} className={activeLink === href ? "header__menu_item header__menu_item-active" : "header__menu_item"}>
//         <Link to={href} >
//             <iconLink />
//         </Link>
//     </Menu.Item>
// )
// const HeaderMenuItem = ({href, LinkName, activeLink, iconLink}) => (
//     <Menu.Item name={LinkName} className={activeLink === href ? "header__menu_item header__menu_item-active" : "header__menu_item"}>
//         <Link to={href} >
//             {console.log(iconLink )}
//             {iconLink }
//             {/*<img src={iconLink} alt="Image Icon"/>*/}
//         </Link>
//     </Menu.Item>
// )
export default HeaderMenuItem;
