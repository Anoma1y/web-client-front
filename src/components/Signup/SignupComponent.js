import React from 'react'
import { Divider, Card, Input, Button, Icon } from 'semantic-ui-react'

const Signup = (props) => (
    <Card fluid color={'violet'}>
        <Card.Content>
            <Card.Header>Регистрация</Card.Header>
            <Divider />
            <Card.Description>
                <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}/>
                <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}} />
                <Input icon='repeat' iconPosition='left' placeholder='Повторите пароль' fluid style={{marginBottom: 15}}
                    onChange={props.onChange}
                />
                <Button fluid>Регистрация</Button>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default Signup;