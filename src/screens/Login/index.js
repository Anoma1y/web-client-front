import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Button, Grid } from 'semantic-ui-react'

import LoginComponent from 'components/Login/LoginComponent'

const Login = props => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column widescreen={7} computer={7} tablet={16} mobile={16}>
                    <LoginComponent/>
                    <Button onClick={() => props.changePage()}>Go to registration</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

const mapDispatchToProps = dispatch => bindActionCreators({
    changePage: () => push('/signup')
}, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Login)

