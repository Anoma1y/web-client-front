import React from 'react'
import {
    Card,
    Input,
    Button,
    Item,
    Message
} from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {
    changeEmail,
    changePassword,
    setAuthInProgress,
    handleLogin,
    setError
} from 'actions/login'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: 0
        };
    }
    handleLoginBtn = () => {
        const { email, password } = this.props;
        this.props.handleLogin({
            email, password
        });
    }
    render () {
        const { email, password, error, changeEmail, changePassword, goToSignup } = this.props;
        return (
            <div>
                <Button.Group fluid widths='2'>
                    <Button color={'orange'} disabled>Вход</Button>
                    <Button onClick={() => goToSignup()}>Регистрация</Button>
                </Button.Group>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={changeEmail} value={email}

                            />
                            <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 5}}
                                   onChange={changePassword} value={password}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />

                            <Item style={{marginBottom: 15, textAlign: 'right'}}>
                                <Item.Description as='a' onClick={() => this.props.goToReset()}>Забыли пароль?</Item.Description>
                            </Item>
                            { error !== null ?
                                <Message warning color={"red"}>
                                    <Message.Header>{error}</Message.Header>
                                </Message> : ""
                            }
                            <Button 
                                fluid
                                onClick={this.handleLoginBtn}
                            >Войти
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
