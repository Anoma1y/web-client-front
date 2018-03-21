import React, { Component } from 'react';
import { handleDeleteTokenUser } from 'actions/users';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        const { handleDeleteTokenUser } = this.props;
        handleDeleteTokenUser();
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}

export default connect(null, {
    handleDeleteTokenUser
})(Logout);
