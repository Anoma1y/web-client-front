import React, { Component } from 'react';
import { handleDeleteTokenUser } from 'actions/users/handleDeleteTokenUser';
import { connect } from 'react-redux';

class Logout extends Component {
    componentWillMount() {
        const TOKEN = this.props.user.jwt;
        localStorage.removeItem("jwt");
        localStorage.removeItem("roles");
        this.props.handleDeleteTokenUser(TOKEN);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(state => ({ user: state.user }), {
    handleDeleteTokenUser
})(Logout);
