import React, { Component } from 'react';
import {
    initialUser
} from 'actions/users/';
import {redirectToSignup} from 'actions/redirect'
import { connect } from 'react-redux';

class CheckToken extends Component {
    componentWillMount() {
        const { initialUser } = this.props;
        const TOKEN = localStorage.getItem("jwt");
        if (TOKEN !== null) {
            initialUser(TOKEN);
        } else {
            redirectToSignup()
        }
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}


export default connect(state => ({ user: state.user }), {
    initialUser,
    redirectToSignup
})(CheckToken);
