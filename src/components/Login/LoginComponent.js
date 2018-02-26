import React from 'react'
import { Card, Input, Button, Item } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    changeEmail,
    changePassword,
    setAuthInProgress,
    setError
} from 'actions/login'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: 0
        };
    }

    render () {
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button color={'orange'} disabled>Log in</Button>
                    <Button onClick={() => this.props.goToSignup()}>Registration</Button>
                </Button.Group>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeEmail.bind(this)} value={this.props.email}

                            />
                            <Input icon='key' iconPosition='left' placeholder='Password' fluid style={{marginBottom: 5}}
                                   onChange={this.props.changePassword.bind(this)} value={this.props.password}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />

                            <Item style={{marginBottom: 15, textAlign: 'right'}}>
                                <Item.Description as='a' onClick={() => this.props.goToReset()}>Forgot password?</Item.Description>
                            </Item>
                            <Button fluid>Login</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    goToSignup: () => push('/signup'),
    goToReset: () => push('/reset'),
    changeEmail,
    changePassword,
    setAuthInProgress,
    setError,
}, dispatch);

const mapStateToProps = (state) => {
    return {
        email: state.login.email,
        password: state.login.password,
        isAuthInProgress: state.login.isAuthInProgress,
        error: state.login.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComponent)
