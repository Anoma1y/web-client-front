import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Icon,
    Divider
} from 'semantic-ui-react';
import { SIGNUP_SUCCESS } from 'libs/messages';

class SignupSuccessComponent extends Component {
    render () {
        const { email } = this.props.signup;
        return (
            <div>
                <Card fluid className={"signup__success component__shadow"}>
                    <Card.Content className={'auth__content'}>
                        <Card.Header className={"auth__header"}>
                            Sign Up
                        </Card.Header>
                        <Divider />
                        <Card.Description className={"success__content"}>
                            <Icon name={"check circle outline"} className={"success__content_icon"}/>
                            <p className={"success__content_text"}>{SIGNUP_SUCCESS.START} <span className={"success__email"}>{email}</span>. {SIGNUP_SUCCESS.FINISH}</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default connect(state => ({ signup: state.signup }), {

})(SignupSuccessComponent);
