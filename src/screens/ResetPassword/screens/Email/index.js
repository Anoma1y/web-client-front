import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import EmailComponent from 'components/Reset/EmailComponent'

const Email = (props) => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <EmailComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Email;