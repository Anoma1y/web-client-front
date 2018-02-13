import React from 'react'
import { Grid, Container, Item } from 'semantic-ui-react'
import Calculator from 'components/Calculator'
const Home = () => (
    <Container>
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={8}>
                    <Grid.Row>

                    </Grid.Row>
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
                </Grid.Column>
                <Grid.Column width={4}>
                    <Grid.Row>

                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
);

export default Home;