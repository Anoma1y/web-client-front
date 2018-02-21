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
                        <p className={"attentionIdentification__container"}>
                            <Icon name={"warning sign"} className={"attentionIdentification__icon"}/>
                            <span className={"attentionIdentification__text"}>Для приобретения токенов необходимо пройти <a href="#" className={"attentionIdentification__link"}>идентификацию пользователя</a></span>
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};