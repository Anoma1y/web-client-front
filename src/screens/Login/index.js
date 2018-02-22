import React from 'react'
import {
    Container,
    Grid
} from 'semantic-ui-react'

import LoginComponent from 'components/Login/LoginComponent'

const Login = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <LoginComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Login;

