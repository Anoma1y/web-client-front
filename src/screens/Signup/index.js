import React from 'react'
import {
    Container,
    Grid
} from 'semantic-ui-react'

import SignupComponent from 'components/Signup/SignupComponent'

const Signup = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <SignupComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Signup;