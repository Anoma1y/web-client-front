import React, { Component } from 'react';
import {
    Menu,
    Container,
    Grid
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from 'logo.svg';

class HeaderMenu extends Component {

    render() {
        const {
            email,
            jwt
        } = localStorage;
        return (
            <Menu className={"header__menu"}>
                <Container>
                    <Grid className={"grid__menu"}>
                        <Grid.Row>
                            <Grid.Column width={1}>
                            </Grid.Column>
                            <Grid.Column floated={"left"} className={"logo_content"} widescreen={4} computer={4} tablet={4} mobile={16}>
                                <Menu className={"menu__color menu__logo"}>
                                    <Menu.Item>
                                        <Link to={"/dashboard/"}>
                                            <img src={Logo} alt="Logo" />
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </Grid.Column>
                            <Grid.Column floated={"right"} className={"user_content"} widescreen={6} computer={6} tablet={6} mobile={16}>
                                {jwt !== undefined ?
                                    <div className={"right__menu menu_login"}>
                                        <div className={"right__menu_item"}>
                                            <Link to={"/dashboard/settings"}>
                                                {email}
                                            </Link>
                                        </div>

                                        <div className={"right__menu_item menu_logout"}>
                                            <Link to={"/logout"}>
                                                Log out
                                            </Link>
                                        </div>
                                    </div> : null
                                }
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
export default HeaderMenu;
