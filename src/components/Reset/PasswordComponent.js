import React from 'react'
import { Card, Input, Button, Divider } from 'semantic-ui-react'

const PasswordComponent = (props) => (
    <div>
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Header>Новый пароль</Card.Header>
                <Divider />
                <Card.Description style={{marginBottom: 15}}>
                    Придумайте новый пароль
                </Card.Description>
                <Card.Description>
                    <Input icon='key' iconPosition='left' placeholder='Пароль' fluid style={{marginBottom: 15}}/>
                    <Input icon='repeat' iconPosition='left' placeholder='Повстарите пароль' fluid style={{marginBottom: 15}}/>
                    <Button fluid>Отправить</Button>
                </Card.Description>
            </Card.Content>
        </Card>
    </div>
);

export default PasswordComponent