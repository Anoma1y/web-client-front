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
            if (currency[0] === "ETH") {
                amountFor = item.amount * 0.001
            }
            else if (currency[0] === "BTC") {
                amountFor = item.amount / (0.0787655 * 0.001)
            }


            else if (currency[0] === "USD") {
                amountFor = (item.amount / 0.0787655) * 0.1
            }

            //USD
            else if (currency[0] === "TSR" && currency[1] === "BTC") {
                amountFor = item.amount * 0.001 * 0.0787655;
            }
            else if (currency[0] === "TSR" && currency[1] === "ETH") {
                amountFor = item.amount * 0.001;
            }
            else if (currency[0] === "TSR" && currency[1] === "USD") {
                amountFor = item.amount * (863.664 * 0.001);
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
                            <Divider/>
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
    user: state.user
}), {
    handleRequestItem
})(RequestList);