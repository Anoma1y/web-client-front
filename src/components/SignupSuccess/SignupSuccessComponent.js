import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Input, Button } from 'semantic-ui-react';
import { push } from 'react-router-redux';


class SignupSuccessComponent extends Component {
    renderSucces = () => (
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Description style={{textAlign: "center"}}>
                    <h1>You have registered</h1>
                    <h3>A confirmation email has been sent to your email</h3>
                </Card.Description>
            </Card.Content>
        </Card>
    )
    render () {
        const { isSignupInProgress } = this.props.signup;
        return (
            <div>
                {isSignupInProgress ? this.renderSucces() : ""}
            </div>
        )
    }
}


export default connect(state => ({ signup: state.signup }), {
    
})(SignupSuccessComponent);
