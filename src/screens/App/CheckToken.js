import React, { Component } from 'react';
import {
    initialUser
} from 'actions/users/';
import { connect } from 'react-redux';

class CheckToken extends Component {
    componentWillMount() {
        const { initialUser } = this.props;
        const TOKEN = localStorage.getItem("jwt");
        if (TOKEN !== null && TOKEN !== undefined) {
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
