import React, { Component } from 'react';
import {
    Card,
    Divider,
    Button,
    Item,
    Message,
    Loader
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';

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
            emailPlaceholder: false,
            passwordPlaceholder: false
        };
    }
    handleChangeEmail = event => {
        const { changeEmail } = this.props;
        const { value } = event.target;
        if (value.length > 0) {
            this.setState({
                emailPlaceholder: true
            })
        } else {
            this.setState({
                emailPlaceholder: false
            })
        }
        changeEmail(value);
    }
    handleChangePassword = event => {
        const { changePassword } = this.props;
        const { value } = event.target;
        if (value.length > 0) {
            this.setState({
                passwordPlaceholder: true
            })
        } else {
            this.setState({
                passwordPlaceholder: false
            })
        }
        changePassword(value);
    }
    handleLoginBtn = event => {
        event.preventDefault();
        const { email, password, setError, handleLogin } = this.props;
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!email.match(pattern)) {
            setError("Please enter a valid Email");
            return;
        }
        if (password.length === 0) {
            setError("Enter password");
            return;
        }
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
            isAuthInProgress
        } = this.props;
        const {
            emailPlaceholder,
            passwordPlaceholder
        } = this.state;
        return (
            <div>
                <Card fluid className={"login"}>
                    <Card.Content>
                        <Card.Header as={"h1"} className={"login__header"}>
                            Sign In
                        </Card.Header>
                        <Divider />
                        <Card.Description className={"login__content auth_input"}>
                            <form action="#">
                                <label>
                                    <input type="email" placeholder={"E-Mail"} onChange={this.handleChangeEmail} value={email} className={emailPlaceholder ? "populated" : ""}/>
                                    <span>E-Mail</span>
                                </label>
                                <label>
                                    <input type="password" placeholder={"Password"} onChange={this.handleChangePassword} value={password} className={passwordPlaceholder ? "populated" : ""}/>
                                    <span>Password</span>
                                </label>

                                <Item className={"login__content_forgot"}>
                                    <Item.Description as='a' onClick={() => this.props.goToReset()}>Forget your password?</Item.Description>
                                </Item>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    fluid
                                    onClick={this.handleLoginBtn}
                                    className={"auth_btn"}
                                >{isAuthInProgress ? <Loader active inline size={"mini"}/> : "Sign In"}
                                </Button>
                            </form>
                            <p className={"login__content_signup"}>Don't have account? <Link to={"/signup"}>Sign Up</Link></p>
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
