import React from 'react'
import {
    Button,
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'

const ChangePassword = (props) => (
    <Card fluid>
        <Card.Content>
            <Card.Header>Change password</Card.Header>
            <Divider className={"white__divider"}/>
            <Grid className={"dashboard__component"}>
                <Grid.Row>
                    <Grid.Column className={"setting__change_buttons auth_input"}>
                        <label>
                            <input type="text" placeholder={'Current password'} />
                            <span>Current password</span>
                        </label>
                        <label>
                            <input type="text" placeholder={'New password'} />
                            <span>New password</span>
                        </label>
                        <label>
                            <input type="text" placeholder={'Repeat password'} />
                            <span>Repeat password</span>
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

export default ChangePassword;