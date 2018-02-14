import React from 'react'
import { Button, Card, Divider, Input} from 'semantic-ui-react'

const ChangePassword = (props) => (
    <Card fluid color={'violet'}>
        <Card.Content>
            <Card.Header>Изменить пароль</Card.Header>
            <Divider />
            <Card.Description>
                <Input placeholder='Текущий пароль' fluid style={{marginBottom: 15}} />
                <Input placeholder='Новый пароль' fluid style={{marginBottom: 15}} />
                <Input placeholder='Повторите пароль' fluid style={{marginBottom: 15}} />
                <Button circular fluid>Изменить</Button>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default ChangePassword;