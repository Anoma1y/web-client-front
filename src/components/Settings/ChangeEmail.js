import React from 'react'
import { Button, Card, Divider, Input} from 'semantic-ui-react'

const ChangeEmail = (props) => (
    <Card fluid color={'violet'}>
        <Card.Content>
            <Card.Header>Изменить e-mail</Card.Header>
            <Divider />
            <Card.Description>
                <Input placeholder='Текущий e-mail' fluid style={{marginBottom: 15}} />
                <Input placeholder='Новый e-mail' fluid style={{marginBottom: 15}} />
                <Button circular fluid>Изменить</Button>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default ChangeEmail;