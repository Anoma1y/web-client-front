import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Icon,
    Divider
} from 'semantic-ui-react';

class SignupSuccessComponent extends Component {
    render () {
        const { email } = this.props.signup;
        return (
            <div>
                <Card fluid className={"success"}>
                    <Card.Content>
                        <Card.Header className={"auth__header"}>
                            Sign Up
                        </Card.Header>
                        <Divider />
                        <Card.Description className={"success__content"}>
                            <Icon name={"check circle outline"} className={"success__content_icon"}/>
                            <p className={"success__content_text"}>We've sent a message to <span className={"success__email"}>{email}</span>. Please check your mail and click activate account to confirm email.</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default connect(state => ({ signup: state.signup }), {

})(SignupSuccessComponent);
