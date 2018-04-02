import React, { Component } from 'react';
import {
    Grid,
    Item
} from 'semantic-ui-react';
import RequestModal from './RequestModal';

class RequestItem extends Component {

    render() {
        const {
            sum,
            amount,
            buttonColor,
            buttonText,
            fixedColor,
            currencyAmount,
            currencyName
        } = this.props;
        const fixedStyleTSR = fixedColor === "TSR";
        const fixedStyleAmount = fixedColor !== "TSR";
        return (
            <Grid verticalAlign={'middle'} className={"request__item"}>
                <Grid.Row className={"request__item_wrapper"}>
                    <Grid.Column widescreen={5} computer={5} tablet={5} mobile={8}>
                        <Item>
                            <Item.Header className={fixedStyleAmount ? "request__item_title request__item_title-active" : "request__item_title"}>Amount</Item.Header>
                            <Item.Description className={fixedStyleAmount ? "request__item_value request__item_value-active" : "request__item_value"}><h3>{sum}</h3></Item.Description>
                        </Item>
                    </Grid.Column>
                    <Grid.Column widescreen={5} computer={5} tablet={5} mobile={8}>
                        <Item>
                            <Item.Header className={fixedStyleTSR ? "request__item_title request__item_title-active" : "request__item_title"}>Tokens</Item.Header>
                            <Item.Description className={fixedStyleTSR ? "request__item_value request__item_value-active" : "request__item_value"}><h3>{amount} </h3></Item.Description>
                        </Item>
                    </Grid.Column>
                    <Grid.Column widescreen={6} computer={6} tablet={6} mobile={16} className={"request__column_btn"}>
                        <RequestModal
                            buttonColor={buttonColor}
                            buttonText={buttonText}
                            currencyAmount={currencyAmount}
                            currencyName={currencyName}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
};

export default RequestItem;