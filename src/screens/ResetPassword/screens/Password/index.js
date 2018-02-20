import React from 'react'
import { Container, Grid } from 'semantic-ui-react'

import PasswordComponent from 'components/Reset/PasswordComponent'

const Password = (props) => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <PasswordComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Password;