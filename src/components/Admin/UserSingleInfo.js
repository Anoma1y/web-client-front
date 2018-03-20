import React from 'react';
import { Grid } from 'semantic-ui-react';

const UserSingleView = ({name, value}) => {
    return (
        <Grid.Row className={"calculator__paymount_info"}>
            <Grid.Column widescreen={6} computer={6} tablet={6} mobile={8}>
                {name}
            </Grid.Column>
            <Grid.Column widescreen={10} computer={10} tablet={10} mobile={8}>
                {value}
            </Grid.Column>
        </Grid.Row>
    )
};
export default UserSingleView;