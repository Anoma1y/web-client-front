import React, { Component } from 'react';
import {
    initialUser
} from 'actions/users/';
import { connect } from 'react-redux';

class CheckToken extends Component {

    componentDidMount() {
        const { initialUser } = this.props;
        const TOKEN = localStorage.getItem("jwt");
        if (TOKEN !== null || this.props.user.jwt !== null) {
            initialUser(TOKEN);
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
    initialUser
})(CheckToken);
