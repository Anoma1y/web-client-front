import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Calculator />
                    </Grid.Row>

                    <Grid.Row>
                        <RequestList />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Grid.Row>
                        <BetaTest />
                        <DownloadList />
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Home;