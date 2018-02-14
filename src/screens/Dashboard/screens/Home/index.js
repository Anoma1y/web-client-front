import React from 'react'
import { Grid, Container, Item } from 'semantic-ui-react'

import Calculator from 'components/Calculator'
import RequestList from 'components/RequestList'

const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={10}>
                    <Grid.Row>
                        <Item>
                            <Item.Header as={"h1"}>
                                Калькулятор
                            </Item.Header>
                            <Item.Content>
                                <Calculator />
                            </Item.Content>
                        </Item>
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