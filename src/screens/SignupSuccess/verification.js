import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

const VerificationUser = props => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <h1>Подтверждено</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default VerificationUser