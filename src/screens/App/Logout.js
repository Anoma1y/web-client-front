import React, { Component } from 'react';
import { handleLogoutUser } from 'actions/users';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        const { handleLogoutUser } = this.props;
        handleLogoutUser();
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

export default connect(null, {
    handleLogoutUser
})(Logout);
