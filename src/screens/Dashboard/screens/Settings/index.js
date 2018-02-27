import React, { Component } from 'react';
import {
    Container,
    Grid
} from 'semantic-ui-react';
import ChangePassword from 'components/Settings/ChangePassword';
import ChangeEmail from 'components/Settings/ChangeEmail';
import Identification from 'components/Settings/Identification';

class Settings extends Component {

    render() {
        return (
            <Container>
                <Grid reversed={"tablet vertically mobile vertically"} centered>
                    <Grid.Column widescreen={5} computer={5} tablet={16} mobile={16}>
                        <Grid>
                            <Grid.Column widescreen={16} computer={16} tablet={8} mobile={16}>
                                <Grid.Row>
                                    <ChangePassword/>
                                </Grid.Row>
                            </Grid.Column>

                            <Grid.Column widescreen={16} computer={16} tablet={8} mobile={16}>
                                <Grid.Row>
                                    <ChangeEmail/>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column widescreen={9} computer={9} tablet={16} mobile={16}>
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
