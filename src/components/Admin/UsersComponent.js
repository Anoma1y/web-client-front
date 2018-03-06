import React, { Component } from 'react';
import {
    Grid,
    Table,
    Container
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserTableRow from './UserTableRow';
import AdminLib from 'libs/ApiLib/AdminLib';
import { addAllUsers } from 'actions/admin';
class UsersComponent extends Component {

    componentDidMount() {
        const { addAllUsers } = this.props;
        AdminLib.getAllUsers().then((data) => {
            addAllUsers(data.data);
        })
    }

    renderAllUsers = () => {
        const { usersList } = this.props.admin;
        return usersList.map(item => {
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
    
    render() {
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Table celled textAlign={"center"}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>id</Table.HeaderCell>
                                        <Table.HeaderCell>Created At</Table.HeaderCell>
                                        <Table.HeaderCell>Updated At</Table.HeaderCell>
                                        {/*<Table.HeaderCell>Deleted At</Table.HeaderCell>*/}
                                        <Table.HeaderCell>EMail</Table.HeaderCell>
                                        <Table.HeaderCell>Roles</Table.HeaderCell>
                                        <Table.HeaderCell>Is Verified</Table.HeaderCell>
                                        <Table.HeaderCell>Is KYC passed</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.renderAllUsers()}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {
    addAllUsers
})(UsersComponent);
