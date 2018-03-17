import React, { Component } from 'react';
import { handleDeleteTokenUser } from 'actions/users';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        const { jwt: TOKEN } = this.props.user;
        const { handleDeleteTokenUser } = this.props;
        localStorage.removeItem("jwt");
        localStorage.removeItem("roles");
        localStorage.removeItem("email");
        localStorage.removeItem("is_kyc_passed");
        localStorage.removeItem("kyc_type");
        handleDeleteTokenUser(TOKEN);
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
