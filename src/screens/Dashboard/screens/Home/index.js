import React, { Component } from 'react';
import {
    Grid,
    Container,
    Sticky, Icon
} from 'semantic-ui-react';

import Timer from 'components/Timer'
import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'
import BetaTest from 'components/BetaTest'
import Roadmap from "components/Roadmap";
import DownloadList from "components/DownloadList";
import SocialNetwork from 'components/SocialNetwork';
import { AttentionIdentification } from 'components/AttentionIdentification';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        const { contextRef } = this.state

        return (
        <Container fluid>
            <Container fluid className={"attentionIdentification"}>
                {/*NEED CHECK USER IDENTIFICATION*/}
                <AttentionIdentification />
            </Container>
            <Container>
                <div ref={this.handleContextRef}>
                    <Grid >
                        <Grid.Row centered>
                            <Grid.Column widescreen={1} computer={1} tablet={16} mobile={16}>
                            </Grid.Column>
                            <Grid.Column widescreen={9} computer={9} tablet={16} mobile={16}>
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
                            <Grid.Column widescreen={5} computer={5} tablet={16} mobile={16}>
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
                            <Grid.Column widescreen={1} computer={1} tablet={16} mobile={16}>
                                <Grid.Row>
                                    <Sticky context={contextRef}>
                                        <SocialNetwork />
                                    </Sticky>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </Container>
        </Container>
        )
    }
}
export default Home;