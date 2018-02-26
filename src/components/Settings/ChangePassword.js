import React from 'react'
import {
    Button,
    Card,
    Divider,
    Input,
    Grid
} from 'semantic-ui-react'

const ChangePassword = (props) => (
    <Card fluid>
        <Card.Content>
            <Card.Header>Change password</Card.Header>
            <Divider className={"white__divider"}/>
            <Grid className={"dashboard__component"}>
                <Grid.Row>
                    <Grid.Column className={"setting__change_buttons"}>
                        <Input placeholder='Current password' fluid />
                        <Input placeholder='New password' fluid />
                        <Input placeholder='Repeat password' fluid />
                        <Button
                            fluid
                            circular
                            className={"setting__button"}
                        >Change
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>
);

export default ChangePassword;