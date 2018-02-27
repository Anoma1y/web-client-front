import React from 'react';
import {
    Card,
    Input,
    Button,
    Message,
    Loader
} from 'semantic-ui-react';
import _ from 'underscore'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
    changeEmail,
    changePassword,
    changeRepeatPassword,
    setSignupInProgress,
    setError,
    handleRegistration,
} from 'actions/signup';
import SignUpLib from 'libs/ApiLib/SignUp';

class SignupComponent extends React.Component {

    handleSignup = () => {
        const { email, password, repeatPassword, setError, handleRegistration } = this.props;
        if (repeatPassword !== password) {
            setError("Passwords do not match");
        } else {
            setError(null);
            handleRegistration({email, password});
        }
    }

    debounceEmail = _.debounce(() => {
        const { setError, email } = this.props;
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

    handleChangeEmail = (event, {value}) => {
        const { changeEmail } = this.props;
        // const pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        // if (!email.match(pattern)) {
        //     setError("Please enter a valid Email");
        //     return;
        // }
        changeEmail(value);
        this.debounceEmail();
    }

    render () {
        const { changePassword, changeRepeatPassword, email, password, repeatPassword, error, isSignupInProgress } = this.props;
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button onClick={() => this.props.goToLogin()}>Log in</Button>
                    <Button color={'orange'} disabled>Registration</Button>
                </Button.Group>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description>
                            <Input
                                icon='at'
                                iconPosition='left'
                                placeholder='E-mail'
                                fluid
                                style={{marginBottom: 15}}
                                onChange={this.handleChangeEmail}
                                value={email}
                            />
                            <Input
                                icon='key'
                                iconPosition='left'
                                type={"password"}
                                placeholder='Password'
                                fluid
                                style={{marginBottom: 15}}
                                onChange={changePassword}
                                value={password}
                            />
                            <Input
                                icon='repeat'
                                iconPosition='left'
                                type={"password"}
                                placeholder='Repeat password'
                                fluid
                                style={{marginBottom: 15}}
                                onChange={changeRepeatPassword}
                                value={repeatPassword}
                            />
                            { error !== null ?
                                <Message warning color={"red"}>
                                    <Message.Header>{error}</Message.Header>
                                </Message> : ""
                            }
                            <Button
                                fluid
                                onClick={this.handleSignup}
                            >{isSignupInProgress ? <Loader active inline size={"mini"}/> : "Register"}
                            </Button>
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