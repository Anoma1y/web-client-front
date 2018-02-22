import React from 'react'
import {
    Button,
    Card,
    Divider,
    Input,
    Grid
} from 'semantic-ui-react'

const ChangeEmail = (props) => (
    <Card fluid>
        <Card.Content>
            <Card.Header>Изменить e-mail</Card.Header>
            <Divider className={"white__divider"}/>
            <Grid className={"dashboard__component"}>
                <Grid.Row>
                    <Grid.Column className={"setting__change_buttons"}>
                        <Input placeholder='Текущий e-mail' fluid />
                        <Input placeholder='Новый e-mail' fluid />
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

export default ChangeEmail;