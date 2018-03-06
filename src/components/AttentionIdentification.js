import React from 'react'
import { Link } from 'react-router-dom';
import {
    Grid,
    Container,
    Icon
} from 'semantic-ui-react'

export const AttentionIdentification = () => {
    return (
        <Container>
            <Grid>
                <Grid.Row centered className={"attentionIdentification__wrapper"}>
                    <Grid.Column width={15}>
                        <div className={"attentionIdentification__container"}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={1}>
                                    </Grid.Column>
                                    <Grid.Column widescreen={1} computer={1}  tablet={1} mobile={16}>
                                       <Icon name={"warning sign"} className={"attentionIdentification__icon"}/>
                                    </Grid.Column>
                                    <Grid.Column widescreen={13} computer={13} tablet={13} mobile={16} className={"attentionIdentification__textColumn"}>
                                        <span className={"attentionIdentification__text"}>In order to be able to buy tokens, you need to be <Link to={"/dashboard/"} className={"attentionIdentification__link"}>identified</Link>
                                        </span>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
};