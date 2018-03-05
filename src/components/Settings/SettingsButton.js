import React from 'react';
import {
    Grid,
    Divider,
    Button
} from 'semantic-ui-react';

export const SettingsButton = () => {
    return (
        <Grid.Row>
            <Grid.Column>
                <Divider />
                <Button
                    className={"setting__button auth_btn setting__submit"}
                    fluid
                    floated={"right"}
                >Submit
                </Button>
            </Grid.Column>
        </Grid.Row>
    )
}