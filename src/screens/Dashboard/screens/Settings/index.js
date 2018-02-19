import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import ChangePassword from 'components/Settings/ChangePassword'
import ChangeEmail from 'components/Settings/ChangeEmail'
import Identification from 'components/Settings/Identification'

const Settings = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid reversed={"tablet vertically mobile vertically"} >
                    <Grid.Column widescreen={5} computer={5} tablet={16} mobile={16} >
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
                            <Identification />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Settings;