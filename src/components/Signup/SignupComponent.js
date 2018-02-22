import React from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    changeEmail,
    changePassword,
    changeRepeatPassword,
    setSignupInProgress,
    setError
} from 'actions/signup';
import axios from 'axios';

class SignupComponent extends React.Component {

    handleSignup = () => {
        const { email, password, repeatPassword, setError, goToSuccess, setSignupInProgress } = this.props;
        if (repeatPassword !== password) {
            setError("Passwords do not match");
            return;
        }
        setError(null);

        axios.head(`http://192.168.0.136:4874/v1/profile/availability?email=${email}`)
        .then(response => {
            if (response.status === 200) {
                setError(null);
                axios.post(`http://192.168.0.136:4874/v1/profile`,{
                    email: email,
                    password: password
                })
                .then(response => {
                    if (response.status === 200) {
                        setSignupInProgress(true);
                        goToSuccess();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }
        })
        .catch(() => {
            setError("Email already used by someone");
        });
    }

    render () {
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button onClick={() => this.props.goToLogin()}>Вход</Button>
                    <Button color={'orange'} disabled>Регистрация</Button>
                </Button.Group>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeEmail.bind(this)} value={this.props.email}
                            />
                            <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changePassword.bind(this)} value={this.props.password}
                            />
                            <Input icon='repeat' iconPosition='left' placeholder='Повторите пароль' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeRepeatPassword.bind(this)} value={this.props.repeatPassword}
                            />
                            {this.props.error !== null ? this.props.error : ""}
                            <Button
                                fluid
                                onClick={this.handleSignup}
                            >Зарегистрироваться
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