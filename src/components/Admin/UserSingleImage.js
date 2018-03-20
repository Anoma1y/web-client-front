import React from 'react';
import {
    Image,
    Grid,
    Label
} from 'semantic-ui-react';

const UserSingleImage = ({text, image}) => {
    return (
        <Grid.Row className={'singleKYC__image'}>
            <Grid.Column width={16} className={'singleKYC__image_text'}>
                <p>{text}</p>
            </Grid.Column>
            <Grid.Column width={16} className={'singleKYC__image_img'}>
                <Image centered src={image} >
                    {image === '' ? <Label content='No image!' icon='warning' /> : null}
                </Image>
            </Grid.Column>
        </Grid.Row>
    )
};
export default UserSingleImage;