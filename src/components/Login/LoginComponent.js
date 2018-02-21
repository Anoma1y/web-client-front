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
    render () {
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button color={'orange'} disabled>Вход</Button>
                    <Button onClick={() => this.props.changePage()}>Регистрация</Button>
                </Button.Group>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeEmail.bind(this)} value={this.props.email}
                            />
                            <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 5}}
                                   onChange={this.props.changePassword.bind(this)} value={this.props.password}
                            />
                            <Item style={{marginBottom: 15, textAlign: 'right'}}>
                                <Item.Description href={'/reset'}>Забыли пароль?</Item.Description>
                            </Item>
                            <Button fluid>Войти</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    changePage: () => push('/signup'),
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
