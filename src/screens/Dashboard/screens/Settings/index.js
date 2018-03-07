import React, { Component } from 'react';
import {
    Container,
    Grid
} from 'semantic-ui-react';
import Identification from 'components/Settings/Identification';

class Settings extends Component {
    render() {
        return (
            <Container>
                <Grid reversed={"tablet vertically mobile vertically"}>
                    <Grid.Column widescreen={10} computer={10} tablet={16} mobile={16}>
                        <Grid.Row>
                            <Identification/>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }
};

export default Settings;
