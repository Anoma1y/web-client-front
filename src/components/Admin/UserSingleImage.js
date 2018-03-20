import React from 'react';
import { Image, Grid } from 'semantic-ui-react';

const UserSingleImage = ({text, image}) => {
    return (
        <Grid.Row>
            <Grid.Column width={16}>
                <p>{text}</p>
            </Grid.Column>
            <Grid.Column width={16}>
                <Image centered src={image} />
            </Grid.Column>
        </Grid.Row>
    )
};
export default UserSingleImage;