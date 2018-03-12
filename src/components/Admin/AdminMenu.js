import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Grid,
    Menu,
    Container
} from 'semantic-ui-react';
class AdminMenu extends Component {
    state = {

    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const {
            activeItem
        } = this.state;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu>
                                <Menu.Item
                                    as={'div'}
                                    name='main'
                                    active={activeItem === 'main'}
                                    onClick={this.handleItemClick}
                                >
                                    <Link to='/admin/'>Main</Link>
                                </Menu.Item>

                                <Menu.Item
                                    as={'div'}
                                    name='reviews'
                                    active={activeItem === 'reviews'}
                                    onClick={this.handleItemClick}
                                >
                                    <Link to='/admin/application'>Application</Link>
                                </Menu.Item>
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default AdminMenu;
