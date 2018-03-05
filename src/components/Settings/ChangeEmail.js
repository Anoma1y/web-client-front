import React from 'react'
import {
    Button,
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'

const ChangeEmail = (props) => (
    <Card fluid>
        <Card.Content>
            <Card.Header>Change e-mail</Card.Header>
            <Divider className={"white__divider"}/>
            <Grid className={"dashboard__component"}>
                <Grid.Row>
                    <Grid.Column className={"setting__change_buttons auth_input"}>
                        <label>
                            <input type="text" placeholder={"Current Email"} className={""}/>
                            <span>Current Email</span>
                        </label>
                        <label>
                            <input type="text" placeholder={"New Email"} className={""}/>
                            <span>New Email</span>
                        </label>
                        <Button
                            fluid
                            circular
                            className={"auth_btn"}
                        >Change
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>
);

export default ChangeEmail;