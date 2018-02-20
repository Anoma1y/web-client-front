import React from 'react'
import { Button, Grid, Item } from 'semantic-ui-react'

const RequestItem = props => (
    <Grid verticalAlign={'middle'}>
        <Grid.Row columns={3}>
            <Grid.Column>
                <Item>
                    <Item.Header>Сумма</Item.Header>
                    <Item.Description><h3>{props.sum}</h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Item>
                    <Item.Header>Токены</Item.Header>
                    <Item.Description><h3>{props.amount} </h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Button
                    circular
                    floated={'right'}
                    onClick={props.onClick}
                    disabled={props.buttonDisabled}
                    basic={props.buttonBasic}
                    inverted={props.buttonInverted}
                    color={props.buttonColor}
                >
                    {props.buttonText}
                </Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default RequestItem;