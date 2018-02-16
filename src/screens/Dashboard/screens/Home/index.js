import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Timer from 'components/Timer'
import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'

const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Timer />
                    </Grid.Row>
                    <Grid.Row>
                        <Calculator />
                    </Grid.Row>

                    <Grid.Row>
                        <RequestList />
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