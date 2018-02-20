import React from 'react';
import {
    Card,
    Grid
} from 'semantic-ui-react'

export default ({timeName, value}) => {
    return (
        <Grid.Column widescreen={2} computer={2} tablet={4} mobile={4} className={"timer__item"}>
            <Card.Meta as={"h2"} className={"timer__item_title"}>{timeName}</Card.Meta>
            <Card.Description as={"h1"} className={"timer__item_value"}>{value}</Card.Description>
        </Grid.Column>
    )
}