import React, { Component } from 'react';
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react';

class Timer extends Component {
    render() {
        return (
            <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                <Card.Content>
                    <Card.Header>Прием заявок закроется через</Card.Header>
                    <Divider />
                    <Grid>
                        <Grid.Row columns={4} textAlign={"center"}>
                            <Grid.Column>
                                <Card.Meta as={"h2"}>Дней</Card.Meta>
                                <Card.Description as={"h1"}>11</Card.Description>
                            </Grid.Column>
                            <Grid.Column>
                                <Card.Meta as={"h2"}>Часов</Card.Meta>
                                <Card.Description as={"h1"}>20</Card.Description>
                            </Grid.Column>
                            <Grid.Column>
                                <Card.Meta as={"h2"}>Минут</Card.Meta>
                                <Card.Description as={"h1"}>56</Card.Description>
                            </Grid.Column>
                            <Grid.Column>
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
