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
                <Grid reversed={"tablet vertically mobile vertically"} centered>
                    <Grid.Column width={16}>
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
