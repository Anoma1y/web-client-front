import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

class Redirect extends Component {
    componentWillMount() {
        const {
            user,
            goToSignup
        } = this.props;
        if (user.jwt === null || user.jwt === undefined || localStorage.jwt === undefined) {
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
    goToSignup: () => push('/signup')
})(Redirect);

