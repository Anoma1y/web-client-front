import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react';
import { handleRequestItem } from 'actions/request/';
import RequestItem from './RequestItem';

class RequestList extends Component {

    componentDidMount() {
        this.props.handleRequestItem(localStorage.jwt);
    }

    separationValue = (value, digits) => new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value);

    renderList () {
        const { items: request } = this.props.requests;
        const { currency: cryptoCurrency, TSR: TOKEN_ATTITUDE_ETH, bonus } = this.props.calculator;
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

            const checkPercent = value => {
                let bonusPercent = 0;
                bonus.forEach((bon) => {
                    if (currency[0] === "TSR" && value >= bon.limit) {
                        bonusPercent = bon.value
                    } else if (currency[1] === "TSR" && value >= bon.limit) {
                        bonusPercent = bon.value
                    }
                })
                return bonusPercent;
            }

            let TOKENVALUE = 0;
            let CURRENCYVALUE = 0;

            const bonusCalc = (value, bonus) => (1 * value)  + ((1 * value) * (bonus / 100));

            if (currency[0] === "TSR" && currency[1] === "ETH") {
                const percent = checkPercent(item.amount);
                CURRENCYVALUE = `${this.separationValue((TOKEN_ATTITUDE_ETH * item.amount), 4)} ETH`;
                TOKENVALUE = this.separationValue(bonusCalc(item.amount, percent), 4);
            }

            else if (currency[0] === "TSR" && currency[1] === "BTC") {
                const percent = checkPercent(item.amount);
                CURRENCYVALUE = `${this.separationValue((item.amount * (TOKEN_ATTITUDE_ETH * cryptoCurrency[1].price_btc)), 4)} BTC`;
                TOKENVALUE = this.separationValue(bonusCalc(item.amount, percent), 4);
            }

            else if (currency[0] === "TSR" && currency[1] === "USD") {
                const percent = checkPercent(item.amount);
                CURRENCYVALUE = `$ ${this.separationValue(item.amount * (cryptoCurrency[1].price_usd * TOKEN_ATTITUDE_ETH), 4)}`;
                TOKENVALUE = this.separationValue(bonusCalc(item.amount, percent), 4);
            }

            else if (currency[0] === "USD" && currency[1] === "TSR") {
                const USDTOKEN = item.amount / (cryptoCurrency[1].price_usd * TOKEN_ATTITUDE_ETH);
                const percent = checkPercent(USDTOKEN)
                CURRENCYVALUE = this.separationValue(bonusCalc(USDTOKEN, percent), 4);
                TOKENVALUE = `$ ${this.separationValue(item.amount, 2)}`;
            }

            else if (currency[0] === "BTC" && currency[1] === "TSR") {
                const BTCTOKEN = (item.amount * (cryptoCurrency[0].price_usd / cryptoCurrency[1].price_usd)) / TOKEN_ATTITUDE_ETH;
                const percent = checkPercent(BTCTOKEN);
                CURRENCYVALUE = this.separationValue(bonusCalc(BTCTOKEN, percent), 4);
                TOKENVALUE = `${this.separationValue(item.amount, 4)} BTC`;
            }

            return (
                <Card.Description key={index}>
                    <RequestItem
                        sum={currency[0] === "TSR" ? CURRENCYVALUE : TOKENVALUE}
                        amount={currency[0] === "TSR" ?  TOKENVALUE:  CURRENCYVALUE}
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