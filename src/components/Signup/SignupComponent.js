import React from 'react'
import { Card, Input, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    changeEmail,
    changePassword,
    changeRepeatPassword,
    setSignupInProgress,
    setError
} from 'actions/signup'

class SignupComponent extends React.Component {
    render () {
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button onClick={() => this.props.changePage()}>Вход</Button>
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
                            <Button fluid>Зарегистрироваться</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login'),
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