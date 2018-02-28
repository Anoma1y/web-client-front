import React, { Component } from 'react';
import { connect } from 'react-redux';
import {redirectToLogin} from 'actions/redirect'

class Redirect extends Component {
    componentWillMount() {
        const { user ,redirectToLogin } = this.props;
        if (user.jwt === null || user.jwt === undefined || localStorage.jwt === null) {
            redirectToLogin();
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
    redirectToLogin
})(Redirect);

