import React, { Component } from 'react';
import UsersComponent from 'components/Admin/UsersComponent'
import AdminMenu from 'components/Admin/AdminMenu';

class Users extends Component {
    render() {
        return (
            <div>
                <AdminMenu />
                <UsersComponent />
            </div>
        );
    }
}

export default Users;
