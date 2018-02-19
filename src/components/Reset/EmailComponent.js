import React from 'react'
import { Card, Input, Button, Divider } from 'semantic-ui-react'

const EmailComponent = (props) => (
    <div>
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Header>Востановление пароля</Card.Header>
                <Divider />
                <Card.Description style={{marginBottom: 15}}>
                    Введите вашу почту и мы вышлим Вам ссылка на форму для востановления пароля
                </Card.Description>
                <Card.Description>
                    <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}/>
                    <Button fluid>Отправить</Button>
                </Card.Description>
            </Card.Content>
        </Card>
    </div>
);

export default EmailComponent