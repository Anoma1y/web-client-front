import React from 'react'
import {
    Button,
    Card,
    Divider,
    Input,
    Grid
} from 'semantic-ui-react'

const ChangePassword = (props) => (
    <Card fluid color={'violet'}>
        <Card.Content>
            <Card.Header>Изменить пароль</Card.Header>
            <Divider className={"white__divider"}/>
            <Grid className={"dashboard__component"}>
                <Grid.Row>
                    <Grid.Column className={"setting__change_buttons"}>
                        <Input placeholder='Текущий пароль' fluid />
                        <Input placeholder='Новый пароль' fluid />
                        <Input placeholder='Повторите пароль' fluid />
                        <Button
                            fluid
                            circular
                            className={"setting__button"}
                        >Изменить
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>
);

export default ChangePassword;