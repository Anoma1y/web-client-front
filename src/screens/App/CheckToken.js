import React, { Component } from 'react';
import {
    initialUser
} from 'actions/users/';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class CheckToken extends Component {

    componentDidMount() {
        const { initialUser, goToSignup } = this.props;
        const TOKEN = localStorage.getItem("jwt");
        if (TOKEN !== null || this.props.user.jwt !== null) {
            initialUser(TOKEN);
        } else {
            goToSignup();
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
    goToSignup: () => push('/signup')
})(CheckToken);
