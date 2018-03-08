import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react';
import { handleRequestItem } from 'actions/request/';
import RequestItem from './RequestItem';
import {
    applicationCalc
} from 'libs/math';

class RequestList extends Component {

    componentDidMount() {
        this.props.handleRequestItem(localStorage.jwt);
    }

    renderList () {
        const { items: request } = this.props.requests;
        const {
            currency: cryptoCurrency,
            TSR: TOKEN_ATTITUDE_ETH,
            bonus
        } = this.props.calculator;

        return request.map((item, index) => {
            let btnOptions = null;
            const currency = item.currency.split("/");
            switch (item.status) {
                case 0:
                    btnOptions = { color: 'grey', text: 'Processing'};
                    break;
                case 1:
                    btnOptions = { color: 'orange', text: 'Pay'};
                    break;
                case 2:
                    btnOptions = { color: 'grey', text: 'Paid'};
                    break;
                default:
                    btnOptions = { color: 'grey', text: 'Processing'};
            }

            const {
                TOKENVALUE,
                CURRENCYVALUE
            } = applicationCalc(item.amount, currency, TOKEN_ATTITUDE_ETH, cryptoCurrency, bonus);

            return (
                <Card.Description key={index}>
                    <RequestItem
                        sum={CURRENCYVALUE}
                        amount={TOKENVALUE}
                        buttonText={btnOptions.text}
                        buttonColor={btnOptions.color}
                        buttonDisabled={item.status !== 1}
                        buttonInverted={item.status === 1}
                        fixedColor={currency[0]}
                    />
                    {index !== request.length - 1 ? <Divider className={"white__divider"} /> : ""}
                </Card.Description>
            )
        })
    }
    render () {
        const { items: request } = this.props.requests;
        return (
             request.length !== 0 ?
                <Card fluid className={"component__main component__shadow"}>
                    <Card.Content>
                        <Card.Header className={"component__title"}>Your Applications</Card.Header>
                        <Divider className={"component__divider"} />
                        <Grid verticalAlign={'middle'} className={"dashboard__component"}>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    {this.renderList()}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card> : null
        )
    }

}

export default connect((state) => ({
    requests: state.requests,
    user: state.user,
    calculator: state.calculator
}), {
    handleRequestItem
})(RequestList);