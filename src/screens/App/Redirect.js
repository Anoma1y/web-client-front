import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    redirectToLogin,
    redirectToSignup
} from 'actions/redirect';

class Redirect extends Component {
    componentWillMount() {
        const { user ,redirectToSignup } = this.props;
        if (user.jwt === null || user.jwt === undefined || localStorage.jwt === null) {
            redirectToSignup();
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
    redirectToLogin,
    redirectToSignup
})(Redirect);

