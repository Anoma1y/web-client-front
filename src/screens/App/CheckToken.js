import React, { Component } from 'react';
import { putToken } from 'actions/users/putToken';
import { connect } from 'react-redux';

class CheckToken extends Component {
    componentWillMount() {
        const TOKEN = localStorage.getItem("jwt");
        this.props.putToken(TOKEN);
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
