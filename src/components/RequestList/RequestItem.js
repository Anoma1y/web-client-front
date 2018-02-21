import React from 'react'
import {
    Button,
    Grid,
    Item
} from 'semantic-ui-react'

const RequestItem = ({sum, amount, onClick, buttonDisabled, buttonBasic, buttonColor, buttonText}) => (
    <Grid verticalAlign={'middle'} className={"request__item"}>
        <Grid.Row columns={3} className={"request__item_wrapper"}>
            <Grid.Column>
                <Item>
                    <Item.Header className={"request__item_title"}>Сумма</Item.Header>
                    <Item.Description className={"request__item_value"}><h3>{sum}</h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Item>
                    <Item.Header className={"request__item_title"}>Токены</Item.Header>
                    <Item.Description className={"request__item_value"}><h3>{amount} </h3></Item.Description>
                </Item>
            </Grid.Column>
            <Grid.Column>
                <Button
                    className={"request__button"}
                    circular
                    fluid
                    floated={'right'}
                    onClick={onClick}
                    disabled={buttonDisabled}
                    basic={buttonBasic}
                    color={buttonColor}
                >
                {buttonText}
                </Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default RequestItem;