import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'
import { handleRequestItem } from 'actions/request/'
import RequestItem from './RequestItem'

class RequestList extends Component {

    componentDidMount() {
        this.props.handleRequestItem(localStorage.jwt);
    }

    renderList () {
        const { items: request } = this.props.requests;
        const { bonus, currency: cryptoCurrency } = this.props.calculator;
        return request.map((item, index) => {
            let btnOptions = null;
            const currency = item.currency.split("/");
            switch (item.status) {
                case 0:
                    btnOptions = { color: 'grey', text: 'Processing', callback: () => {} };
                    break;
                case 1:
                    btnOptions = { color: 'orange', text: 'Pay', callback: () => {} };
                    break;
                case 2:
                    btnOptions = { color: 'grey', text: 'Paid', callback: () => {} };
                    break;
                default:
                    btnOptions = { color: 'grey', text: 'Processing', callback: () => {} };
            }
            let amountFor;
            let ddd;
            bonus.forEach((bon) => {
                if (item.fixCurrency === "TSR" && item.amount > bon.limit) {
                    ddd = bon.value
                } else if (item.forCurrency === "TSR" && item.amount > bon.limit) {
                    ddd = bon.value
                }
            })
            console.log(ddd, item.amount);
            if (currency[0] === "BTC" && currency[1] === "TSR") {
                amountFor = item.amount / (cryptoCurrency[1].price_btc * 0.001)
            }

            else if (currency[0] === "USD" && currency[1] === "TSR") {
                amountFor = item.amount / (cryptoCurrency[1].price_usd * 0.001);
            }

            else if (currency[0] === "TSR" && currency[1] === "BTC") {
                amountFor = item.amount * 0.001 * cryptoCurrency[1].price_btc;
            }

            else if (currency[0] === "TSR" && currency[1] === "ETH") {
                amountFor = item.amount * 0.001;
            }

            else if (currency[0] === "TSR" && currency[1] === "USD") {
                amountFor = item.amount * (cryptoCurrency[1].price_usd * 0.001);
            }

            return (
                <Card.Description key={index}>
                    <RequestItem
                        sum={`${item.amount} ${currency[0]}`}
                        amount={`${amountFor.toFixed(4)} ${currency[1]}`}
                        buttonText={btnOptions.text}
                        buttonColor={btnOptions.color}
                        buttonDisabled={item.status !== 1}
                        buttonInverted={item.status === 1}
                    />
                    {index !== request.length - 1 ? <Divider className={"white__divider"} /> : ""}
                </Card.Description>
            )
        })
    }
    render () {
        const { items: request } = this.props.requests;
        return (
            <div>
                { request.length !== 0 ?
                    <Card fluid>
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
                }
            </div>
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