import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Timer from 'components/Timer'
import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
import Social from 'components/Social';

const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={1}>

                </Grid.Column>
                <Grid.Column width={9}>
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
                <Grid.Column width={5}>
                    <Grid.Row>
                        <BetaTest />
                        <DownloadList />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={1}>
                    <Grid.Row>
                        <Social />
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Home;