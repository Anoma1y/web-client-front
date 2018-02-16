import React, { Component } from 'react';
import {
    Card,
    Divider,
    Grid,
    Header
} from 'semantic-ui-react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateEnd: {
                year: 2019,
                month: 5,
                day: 20,
                hour: 10,
                minutes: 22,
                seconds: 0
            }
        }
    }
    render() {
        return (
            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Прием заявок закроется через</Card.Header>
                    <Divider />
                    <Grid>
                        <Grid.Row textAlign={"center"}>
                            <Grid.Column width={2}>
                                <Card.Meta as={"h2"}>Дней</Card.Meta>
                                <Card.Description as={"h1"}>11</Card.Description>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Card.Meta as={"h2"}>Часов</Card.Meta>
                                <Card.Description as={"h1"}>20</Card.Description>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Card.Meta as={"h2"}>Минут</Card.Meta>
                                <Card.Description as={"h1"}>56</Card.Description>
                            </Grid.Column>
                            <Grid.Column width={2}>
                                <Card.Meta as={"h2"}>Секунд</Card.Meta>
                                <Card.Description as={"h1"}>17</Card.Description>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
}

export default Timer;
