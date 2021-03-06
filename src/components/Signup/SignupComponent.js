import React, { Component } from 'react';
import {
    Card,
    Button,
    Message,
    Loader,
    Divider
} from 'semantic-ui-react';
import _ from 'underscore'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import {
    changeEmail,
    changePassword,
    changeRepeatPassword,
    setSignupInProgress,
    setError,
    handleRegistration,
} from 'actions/signup';
import SignUpLib from 'libs/ApiLib/SignUp';

class SignupComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            emailPlaceholder: false,
            passwordPlaceholder: false,
            repeatPasswordPlaceholder: false
        }
    }

    handleSignup = event => {
        event.preventDefault();
        const { email, password, repeatPassword, setError, handleRegistration } = this.props;
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!email.match(pattern)) {
            setError("Please enter a valid Email");
            return;
        }
        if (repeatPassword !== password) {
            setError("Passwords do not match");
            return;
        } else if (password.length < 5) {
            setError("Password must contain more than 5 characters");
            return;
        }
        setError(null);
        handleRegistration();
    }

    debounceEmail = _.debounce(() => {
        const { setError, email } = this.props;
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!email.match(pattern)) {
            setError("Please enter a valid Email");
            return;
        }
        SignUpLib.checkAvailability(email).then(() => {
            setError(null);
        }).catch(() => {
            if (email.length !== 0) {
                setError("Email already used by someone");
            } else {
                setError(null);
            }
        })
    }, 1500)

    handleChangeEmail = event => {
        const { changeEmail, setError } = this.props;
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
        if (value.length !== 0) {
            this.debounceEmail();
        } else {
            setError(null);
        }
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

    handleChangeRepeatPassword = event => {
        const { changeRepeatPassword} = this.props;
        const { value } = event.target;
        if (value.length > 0) {
            this.setState({
                repeatPasswordPlaceholder: true
            })
        } else {
            this.setState({
                repeatPasswordPlaceholder: false
            })
        }
        changeRepeatPassword(value);
    }

    render () {
        const {
            email,
            password,
            repeatPassword,
            error,
            isSignupInProgress
        } = this.props;
        const {
            emailPlaceholder,
            passwordPlaceholder,
            repeatPasswordPlaceholder
        } = this.state;
        return (
            <div>
                <Card fluid className={"signup component__shadow"}>
                    <Card.Content className={"auth__content"}>
                       <Card.Header as={"h1"} className={"login__header"}>
                           Sign Up
                       </Card.Header>
                       <Divider className={"auth__divider"}/>
                        <Card.Description className={"signup__content auth_input auth_input-success"}>
                            <form action="#">
                                <label>
                                    <input type="email" placeholder={"Email"} onChange={this.handleChangeEmail} value={email} className={emailPlaceholder ? "populated" : ""}/>
                                    <span className={'auth_input-span'}>Email</span>
                                </label>
                                <label>
                                    <input type="password" placeholder={"Password"} onChange={this.handleChangePassword} value={password} className={passwordPlaceholder ? "populated" : ""}/>
                                    <span className={'auth_input-span'}>Password</span>
                                </label>
                                <label>
                                    <input type="password" placeholder={"Repeat Password"} onChange={this.handleChangeRepeatPassword} value={repeatPassword} className={repeatPasswordPlaceholder ? "populated" : ""}/>
                                    <span className={'auth_input-span'}>Repeat Password</span>
                                </label>
                                <p className={"signup__content_confirm"}>
                                    By clicking Sign Up, you agree to the <a href={"https://example.com"} target={"_blank"}>Terms of service</a> and <a href={"https://example.com"} target={"_blank"}>Privacy Policy</a>
                                </p>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    fluid
                                    className={"auth_btn"}
                                    onClick={this.handleSignup}
                                    disabled={isSignupInProgress === true ? true : false}
                                >{isSignupInProgress ? <Loader active inline size={"mini"}/> : "SIGN UP"}
                                </Button>
                            </form>
                            <p className={"signup__content_login"}>
                                Already have an account? <Link to={"/login"}>Sign In</Link>
                            </p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToLogin: () => push('/login'),
    goToSuccess: () => push('/signupsuccess'),
    changeEmail,
    changePassword,
    changeRepeatPassword,
    setSignupInProgress,
    setError,
    handleRegistration
}, dispatch);

const mapStateToProps = (state) => {
    return {
        email: state.signup.email,
        repeatPassword: state.signup.repeatPassword,
        password: state.signup.password,
        isSignupInProgress: state.signup.isSignupInProgress,
        error: state.signup.error
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupComponent)
