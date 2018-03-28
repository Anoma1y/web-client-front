import React, { Component } from 'react';
import {
    Grid,
    Table,
    Container,
    Button,
    Pagination,
    Modal,
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
import { currentCountItems } from 'libs/math';

class UsersComponent extends Component {

    state = {
        itemsOnPage: 15,
        totalPages: 1,
        currentPage: 1,
        modalIsOpen: false
    }
    
    componentWillMount() {
        const { changeDeleteUsers } = this.props;
        changeDeleteUsers([]);
    }

    componentDidMount() {
        this.getUsers();
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({
            currentPage: activePage
        })
        const { changeDeleteUsers } = this.props;
        changeDeleteUsers([]);
    }

    renderAllUsers = () => {
        const { usersList } = this.props.admin;
        const {
            itemsOnPage,
            currentPage
        } = this.state;
        const {
            fromPage,
            toPage
        } = currentCountItems(itemsOnPage, currentPage);
        return usersList.data.slice(fromPage, toPage).map(item => {
            return <UserTableRow
                key={item.ID}
                id={item.ID}
                createdAt={item.CreatedAt}
                updatedAt={item.UpdatedAt}
                deletedAt={item.DeletedAt}
                email={item.email}
                roles={item.roles}
                kyc_type={item.kyc_type}
                is_verified={item.is_verified}
                is_kyc_passed={item.is_kyc_passed}
                is_blocked={item.is_blocked}
            />
        })
    }
    handleSort = clickedColumn => () => {
        const { usersList } = this.props.admin;
        const { sortedUsers } = this.props;
        const newData = clickedColumn === 'createdAt' ?
            _.sortBy(usersList.data, function(node){
                return - (new Date(node.CreatedAt).getTime());
            })
            : clickedColumn === 'is_kyc_passed' ?
                _.chain(usersList.data)
                    .sortBy('is_kyc_passed')
                    .sortBy(node => node['kyc_type'].length)
                    .value()
                : clickedColumn === 'is_verified' ?
                    _.chain(usersList.data)
                        .sortBy('is_verified')
                        .sortBy('is_blocked')
                        .value()
                : _.sortBy(usersList.data, clickedColumn);
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

    getUsers = () => {
        const { addAllUsers } = this.props;
        AdminLib.getAllUsers().then((data) => {
            this.setState({
                totalPages: Math.ceil(data.data.length / this.state.itemsOnPage),
                modalIsOpen: false
            })
            addAllUsers(_.sortBy(data.data, function(node) {
                return -(new Date(node.CreatedAt).getTime());
            }));
        })
    }

    deleteUser = () => {
        const {
            deleteUsers
        } = this.props.admin;
        const delUser = deleteUsers.join(',');
        AdminLib.deleteUser(delUser)
            .then((data) => {
                if (data.status === 200) {
                    this.getUsers();
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    handleCloseModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }
    openModal = () => {
        const {
            deleteUsers
        } = this.props.admin;
        if (deleteUsers.length !== 0) {
            this.setState({
                modalIsOpen: true
            })
        }
    }
    render() {
        const {
            usersList
        } = this.props.admin;
        const {
            modalIsOpen
        } = this.state;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled sortable textAlign={"center"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell width={1} sorted={usersList.column === 'ID' ? usersList.direction : null} onClick={this.handleSort('ID')}>ID</Table.HeaderCell>
                                        <Table.HeaderCell width={5} sorted={usersList.column === 'CreatedAt' ? usersList.direction : null} onClick={this.handleSort('CreatedAt')}>Created</Table.HeaderCell>
                                        <Table.HeaderCell width={5}>Email</Table.HeaderCell>
                                        <Table.HeaderCell width={1} sorted={usersList.column === 'roles' ? usersList.direction : null} onClick={this.handleSort('roles')}>Role</Table.HeaderCell>
                                        <Table.HeaderCell width={1} sorted={usersList.column === 'is_verified' ? usersList.direction : null} onClick={this.handleSort('is_verified')}>Verified</Table.HeaderCell>
                                        <Table.HeaderCell width={1} sorted={usersList.column === 'is_kyc_passed' ? usersList.direction : null} onClick={this.handleSort('is_kyc_passed')}>KYC</Table.HeaderCell>
                                        <Table.HeaderCell width={2}> </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderAllUsers()}
                                </Table.Body>
                                <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='6'>
                                            <Pagination defaultActivePage={1} totalPages={this.state.totalPages} onPageChange={this.handlePaginationChange}/>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell colSpan='1'>
                                            <Modal
                                                trigger={
                                                    <Button
                                                        floated='right'
                                                        color={"youtube"}
                                                        size='small'
                                                        fluid
                                                        onClick={this.openModal}
                                                    >
                                                        Remove Users
                                                    </Button>
                                                }
                                                open={modalIsOpen}
                                                onClose={this.handleCloseModal}
                                                basic
                                                size='tiny'
                                            >
                                                <Modal.Content className={"modal__success"}>
                                                    <Modal.Description>
                                                        <div className={"modal__success_icon modal__error-icon"}>
                                                            <Icon name={"attention"} />
                                                        </div>
                                                        <div className={"modal__success_text black-text"}>
                                                            <span>
                                                                Remove users?
                                                            </span>
                                                        </div>
                                                        <div className={"modal__success_btn modal__success-error"}>
                                                            <Button
                                                                className={"dashboard__submit"}
                                                                onClick={this.deleteUser}
                                                            >Remove
                                                            </Button>
                                                            <Button
                                                                className={"dashboard__submit auth_btn"}
                                                                onClick={this.handleCloseModal}
                                                            >Cancel
                                                            </Button>
                                                        </div>
                                                    </Modal.Description>
                                                </Modal.Content>
                                            </Modal>
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

export default connect(state => ({
    admin: state.admin
}), {
    addAllUsers,
    sortedUsers,
    changeDeleteUsers
})(UsersComponent);
