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
        const { handleRequestItem } = this.props;
        handleRequestItem();
    }

    renderList () {
        const {
            items: request,
            bonus: BONUS_LIST
        } = this.props.requests;
        const {
            currency: CRYPTO_CURRENCY,
            TSR: TOKEN_ATTITUDE_ETH,
        } = this.props.rate;
        return request.map((item, index) => {
            let btnOptions = null;
            const CURRENCY = item.currency.split("/");
            switch (item.status) {
                case 0:
                    btnOptions = { color: 'grey', text: 'Processing'};
                    break;
                case 1:
                    btnOptions = { color: 'blue', text: 'Approved'};
                    break;
                case 2:
                    btnOptions = { color: 'red', text: 'Rejected' };
                    break;
                case 3:
                    btnOptions = { color: 'green', text: 'Paid'};
                    break;
                default:
                    btnOptions = { color: 'grey', text: 'Processing'};
            }
            console.log(item);
            const {
                TOKENVALUE,
                CURRENCYVALUE
            } = applicationCalc(item.CreatedAt, item.amount, CURRENCY, TOKEN_ATTITUDE_ETH, CRYPTO_CURRENCY, BONUS_LIST);

            return (
                <Card.Description key={index}>
                    <RequestItem
                        sum={CURRENCYVALUE}
                        amount={TOKENVALUE}
                        buttonText={btnOptions.text}
                        buttonColor={btnOptions.color}
                        buttonDisabled={item.status !== 1}
                        buttonInverted={item.status === 1}
                        fixedColor={CURRENCY[0]}
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
    rate: state.rate
}), {
    handleRequestItem
})(RequestList);