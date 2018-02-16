import React from 'react';
import {
    Card,
    Grid
} from 'semantic-ui-react'

export default ({timeName, value}) => {
    return (
        <Grid.Column width={2}>
            <Card.Meta as={"h2"}>{timeName}</Card.Meta>
            <Card.Description as={"h1"}>{value}</Card.Description>
        </Grid.Column>
    )
}