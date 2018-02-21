import React from 'react'
import {
    Grid,
    Container,
    Icon
} from 'semantic-ui-react'

export const AttentionIdentification = () => {
    return (
        <Container>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={15}>
                        <p>
                            <Icon name={"warning sign"}/>
                            <span>Для приобретения токенов необходимо пройти <a href="#">идентификацию пользователя</a></span>
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};