import React from 'react'
import { Grid, Container } from 'semantic-ui-react'

import Timer from 'components/Timer'
import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
import SocialNetwork from 'components/SocialNetwork';

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
                        <DownloadList />
                    </Grid.Row>
                    <Grid.Row>
                        <Roadmap />
                    </Grid.Row>
                    <Grid.Row>
                        <BetaTest />
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column width={1}>
                    <Grid.Row>
                        <SocialNetwork />
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Home;