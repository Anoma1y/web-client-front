import React, { Component } from 'react';
import {
    Card,
    Input,
    Button,
    Item,
    Message,
    Loader
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    changeEmail,
    changePassword,
    setAuthInProgress,
    handleLogin,
    setError
} from 'actions/login'

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: 0
        };
    }

    handleLoginBtn = () => {
        const { email, password, setError, handleLogin } = this.props;
        const pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!email.match(pattern)) {
            setError("Please enter a valid Email");
            return;
        }
        if (password.length === 0) {
            setError("Enter password");
            return;
        }
        // else if (password.length < 5) {
        //     setError("Password must contain more than 5 characters");
        //     return;
        // }
        setError(null);
        handleLogin({
            email,
            password
        });
    }

    render () {
        const {
            email,
            password,
            error,
            changeEmail,
            changePassword,
            isAuthInProgress
        } = this.props;
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
                                   onChange={changeEmail} value={email}

                            />
                            <Input icon='key' iconPosition='left' placeholder='Password' fluid style={{marginBottom: 5}}
                                   onChange={changePassword} value={password}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />

                            <Item style={{marginBottom: 15, textAlign: 'right'}}>
                                <Item.Description as='a' onClick={() => this.props.goToReset()}>Forgot password?</Item.Description>
                            </Item>
                            { error !== null ?
                                <Message warning color={"red"}>
                                    <Message.Header>{error}</Message.Header>
                                </Message> : ""
                            }
                            <Button 
                                fluid
                                onClick={this.handleLoginBtn}
                            >{isAuthInProgress ? <Loader active inline size={"mini"}/> : "Login"}
                            </Button>
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
    handleLogin,
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
