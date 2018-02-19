import React from 'react'
import { Divider, Card, Input, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const SignupComponent = (props) => (
    <div>
        <Button.Group fluid widths='2'>
            <Button onClick={() => props.changePage()}>Вход</Button>
            <Button color={'violet'} disabled>Регистрация</Button>
        </Button.Group>
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Header>Регистрация</Card.Header>
                <Divider />
                <Card.Description>
                    <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}/>
                    <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}} />
                    <Input icon='repeat' iconPosition='left' placeholder='Повторите пароль' fluid style={{marginBottom: 15}}/>
                    <Button fluid>Регистрация</Button>
                </Card.Description>
            </Card.Content>
        </Card>
    </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(SignupComponent)