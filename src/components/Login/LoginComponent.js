import React from 'react'
import { Divider, Card, Input, Button } from 'semantic-ui-react'

const Login = (props) => (
    <Card fluid color={'violet'}>
        <Card.Content>
            <Card.Header>Вход</Card.Header>
            <Divider />
            <Card.Description>
                <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}/>
                <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}} />
                <Input icon='repeat' iconPosition='left' placeholder='Повторите пароль' fluid style={{marginBottom: 15}}/>
                <Button fluid>Регистрация</Button>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default Login;