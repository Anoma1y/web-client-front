import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'

import SignupSuccessComponent from 'components/SignupSuccess/SignupSuccessComponent'

const SignupSuccess = props => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <SignupSuccessComponent/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default SignupSuccess