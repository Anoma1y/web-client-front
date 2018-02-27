import React, { Component } from 'react';
import {
    putToken
} from 'actions/users/';
import { connect } from 'react-redux';

class CheckToken extends Component {
    componentWillMount() {
        const { putToken } = this.props;
        const TOKEN = localStorage.getItem("jwt");
        putToken(TOKEN);
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}


export default connect(state => ({ user: state.user }), {
    putToken
})(CheckToken);
