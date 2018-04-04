import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react';
import { handleRequestItem } from 'actions/request/';
import RequestItem from './RequestItem';
import { applicationCalc } from 'libs/math';

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
        const {
            is_blocked,
            isIdentification
        } = this.props.user;
        const KYC_PAY_BAN = !isIdentification || is_blocked;
        return request.map((item, index) => {
            const CURRENCY = item.currency.split("/");
            const {
                TOKENVALUE,
                CURRENCYVALUE,
                CURRENCY_AMOUNT,
                CURRENCY_NAME
            } = applicationCalc(item.CreatedAt, item.amount, CURRENCY, TOKEN_ATTITUDE_ETH, CRYPTO_CURRENCY, BONUS_LIST);

            return (
                <Card.Description key={index}>
                    <RequestItem
                        sum={CURRENCYVALUE}
                        amount={TOKENVALUE}
                        status={item.status}
                        currencyAmount={CURRENCY_AMOUNT}
                        currencyName={CURRENCY_NAME}
                        payBan={KYC_PAY_BAN}
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
             request.length !== 0 &&
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
                </Card>
        )
    }

}

export default connect((state) => ({
    requests: state.requests,
    rate: state.rate,
    user: state.user
}), {
    handleRequestItem
})(RequestList);