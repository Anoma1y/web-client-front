import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import ChangePassword from 'components/Settings/ChangePassword'
import ChangeEmail from 'components/Settings/ChangeEmail'
import Identification from 'components/Settings/Identification'

const Settings = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={6}>
                    <Grid.Row style={{marginBottom: 25}}>
                        <ChangePassword/>
                    </Grid.Row>
                    <Grid.Row>
                        <ChangeEmail/>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Identification />
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Settings;