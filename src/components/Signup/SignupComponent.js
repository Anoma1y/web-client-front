import React from 'react';
import {
    Card,
    Input,
    Button
} from 'semantic-ui-react';
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
import ApiLib from 'libs/ApiLib/SignUp'
class SignupComponent extends React.Component {

    handleSignup = () => {
        const { email, password, repeatPassword, setError, goToSuccess, setSignupInProgress } = this.props;
        if (repeatPassword !== password) {
            setError("Passwords do not match");
            return;
        } else {
            setError(null);
        }
        ApiLib.regUser(email, password).then(() => {
            setError(null);
            setSignupInProgress(true);
            goToSuccess();
        }).catch((err) =>{
            setError(err)
        })
    }

    render () {
        const { changeEmail, changePassword, changeRepeatPassword, email, password, repeatPassword, error } = this.props;
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button onClick={() => this.props.goToLogin()}>Вход</Button>
                    <Button color={'orange'} disabled>Регистрация</Button>
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
                                onChange={changeEmail}
                                value={email}
                            />
                            <Input
                                icon='key'
                                iconPosition='left'
                                placeholder='Пароль'
                                fluid
                                style={{marginBottom: 15}}
                                onChange={changePassword}
                                value={password}
                            />
                            <Input
                                icon='repeat'
                                iconPosition='left'
                                placeholder='Повторите пароль'
                                fluid
                                style={{marginBottom: 15}}
                                onChange={changeRepeatPassword}
                                value={repeatPassword}
                            />
                            {error !== null ? error : ""}
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