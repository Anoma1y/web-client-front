import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';


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
        return (
            <div>
                {this.renderSucces()}
            </div>
        )
    }
}

export default connect(state => ({ signup: state.signup }), {

})(SignupSuccessComponent);
