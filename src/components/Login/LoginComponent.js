import React from 'react'
import { Card, Input, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const LoginComponent = (props) => (
    <div>
        <Button.Group fluid widths='2'>
            <Button color={'orange'} disabled>Вход</Button>
            <Button onClick={() => props.changePage()}>Регистрация</Button>
        </Button.Group>
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Description>
                    <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}/>
                    <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}} />
                    <Button fluid>Войти</Button>
                </Card.Description>
            </Card.Content>
        </Card>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/signup')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(LoginComponent)
