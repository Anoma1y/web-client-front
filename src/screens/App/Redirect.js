import React, { Component } from 'react';
import { connect } from 'react-redux';
import {redirectToHome} from 'actions/redirect'

class Redirect extends Component {
    componentWillMount() {
        const { user ,redirectToHome } = this.props;
        if (user.jwt === null || user.jwt === undefined || localStorage.jwt === null) {
            redirectToHome();
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
    redirectToHome
})(Redirect);

