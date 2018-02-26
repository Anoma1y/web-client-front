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
                <Grid.Row centered>
                    <Grid.Column width={15}>
                        <div className={"attentionIdentification__container"}>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column widescreen={1} computer={1}  tablet={1} mobile={16} textAlign={"center"}>
                                       <Icon name={"warning sign"} className={"attentionIdentification__icon"}/>
                                    </Grid.Column>
                                    <Grid.Column widescreen={15} computer={15} tablet={15} mobile={16} className={"attentionIdentification__textColumn"}>
                                        <span className={"attentionIdentification__text"}>In order to be able to buy tokens, you need to be <Link to={"/dashboard/settings"} className={"attentionIdentification__link"}>identified</Link>
                                        </span>
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