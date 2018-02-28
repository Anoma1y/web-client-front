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

    handleSignup = () => {
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
        handleRegistration({email, password});
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
                <Card fluid className={"signup"}>
                   <Card.Content>
                       <Card.Header as={"h1"} className={"login__header"}>
                           Sign Up
                       </Card.Header>
                       <Divider />
                        <Card.Description className={"signup__content auth_input"}>
                            <label>
                                <input type="email" placeholder={"E-Mail"} onChange={this.handleChangeEmail} value={email} className={emailPlaceholder ? "populated" : ""}/>
                                <span>E-Mail</span>
                            </label>
                            <label>
                                <input type="password" placeholder={"Password"} onChange={this.handleChangePassword} value={password} className={passwordPlaceholder ? "populated" : ""}/>
                                <span>Password</span>
                            </label>
                            <label>
                                <input type="password" placeholder={"Repeat Password"} onChange={this.handleChangeRepeatPassword} value={repeatPassword} className={repeatPasswordPlaceholder ? "populated" : ""}/>
                                <span>Repeat Password</span>
                            </label>
                            <p className={"signup__content_confirm"}>
                                By clicking Sign Up, you agree to the <a href={"https://tsrpay.com/docs/terms-of-service.pdf"} target={"_blank"}>Terms of Service</a> and <a href={"https://tsrpay.com/docs/privacy-policy.pdf"} target={"_blank"}>Privacy Policy</a>
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
                            >{isSignupInProgress ? <Loader active inline size={"mini"}/> : "Register"}
                            </Button>
                            <p className={"signup__content_login"}>
                                Already have account? <Link to={"/login"}>Sign In</Link>
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