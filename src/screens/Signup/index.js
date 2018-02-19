import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Button, Grid } from 'semantic-ui-react'

import SignupComponent from 'components/Signup/SignupComponent'

const Signup = props => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <SignupComponent/>
                    <Button onClick={() => props.changePage()}>
                        Go to login
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/login')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Signup)