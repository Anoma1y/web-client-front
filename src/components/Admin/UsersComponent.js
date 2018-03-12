import React, { Component } from 'react';
import {
    Grid,
    Table,
    Container,
    Button,
    Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserTableRow from './UserTableRow';
import AdminLib from 'libs/ApiLib/AdminLib';
import {
    addAllUsers,
    sortedUsers,
    changeDeleteUsers
} from 'actions/admin';
import _ from 'underscore';

class UsersComponent extends Component {


    componentWillMount() {
        const { changeDeleteUsers } = this.props;
        changeDeleteUsers([]);
    }

    componentDidMount() {
        const { addAllUsers } = this.props;
        AdminLib.getAllUsers().then((data) => {
            addAllUsers(_.sortBy(data.data, function(node) {
                return -(new Date(node.CreatedAt).getTime());
            }));
        })
    }

    renderAllUsers = () => {
        const { usersList } = this.props.admin;
        return usersList.data.map(item => {
            return <UserTableRow
                key={item.ID}
                id={item.ID}
                createdAt={item.CreatedAt}
                updatedAt={item.UpdatedAt}
                deletedAt={item.DeletedAt}
                email={item.email}
                roles={item.roles}
                is_verified={item.is_verified}
                is_kyc_passed={item.is_kyc_passed}
            />
        })
    }
    
    handleSort = clickedColumn => () => {
        const { usersList } = this.props.admin;
        const { sortedUsers } = this.props;
        const newData = clickedColumn === 'createdAt' ? _.sortBy(usersList.data, function(node){
            return - (new Date(node.CreatedAt).getTime());
        }) : _.sortBy(usersList.data, clickedColumn);
        const sortData = {
            column: clickedColumn,
            data:
                usersList.direction === 'descending' ?
                   newData :
                   newData.reverse(),
            direction:
                usersList.direction === 'ascending' ?
                    'descending' :
                    'ascending'
        }
        sortedUsers(sortData);
    }

    render() {
        const {
            usersList
        } = this.props.admin;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled sortable textAlign={"center"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell sorted={usersList.column === 'ID' ? usersList.direction : null} onClick={this.handleSort('ID')}>ID</Table.HeaderCell>
                                        <Table.HeaderCell sorted={usersList.column === 'CreatedAt' ? usersList.direction : null} onClick={this.handleSort('CreatedAt')}>Created</Table.HeaderCell>
                                        <Table.HeaderCell>Email</Table.HeaderCell>
                                        <Table.HeaderCell sorted={usersList.column === 'roles' ? usersList.direction : null} onClick={this.handleSort('roles')}>Role</Table.HeaderCell>
                                        <Table.HeaderCell sorted={usersList.column === 'is_verified' ? usersList.direction : null} onClick={this.handleSort('is_verified')}>Verified</Table.HeaderCell>
                                        <Table.HeaderCell sorted={usersList.column === 'is_kyc_passed' ? usersList.direction : null} onClick={this.handleSort('is_kyc_passed')}>KYC passed</Table.HeaderCell>
                                        <Table.HeaderCell> </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderAllUsers()}
                                </Table.Body>
                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='16'>
                                            <Button floated='right' icon labelPosition='left' color={"youtube"} size='small'>
                                                <Icon name='remove user' /> Remove User
                                            </Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {
    addAllUsers,
    sortedUsers,
    changeDeleteUsers
})(UsersComponent);
