import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Calculator from 'components/Calculator'
import Request from 'components/Request'

const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Calculator />
                    </Grid.Row>

                    <Grid.Row>
                        <Request />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Grid.Row>

                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Home;