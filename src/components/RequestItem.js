import React from 'react'
import {
    Button,
    Grid,
    Item
} from 'semantic-ui-react'

const RequestItem = props => (
    <Grid verticalAlign={'middle'} className={"component__main"}>
        <Grid.Row columns={3}>
            <Grid.Column>
                <Item className={"request__item"}>
                    <Item.Header className={"request__item_title"}>Сумма</Item.Header>
                    <Item.Description className={"request__item_value"}><h3>{props.sum}</h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Item>
                    <Item.Header className={"request__item_title"}>Токены</Item.Header>
                    <Item.Description className={"request__item_value"}><h3>{props.amount} </h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Button
                    className={"request__button"}
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