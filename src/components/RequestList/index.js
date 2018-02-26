import React from 'react'
import { connect } from 'react-redux'
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'

import RequestItem from './RequestItem'

class RequestList extends React.Component {
    renderList () {
        const { items: request } = this.props.requests;
        return request.map((item, index) => {
            let btnOptions = null;

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
            return (

                <Card.Description key={index}>
                    <RequestItem
                        sum={`${item.sum} ${item.currency}`}
                        amount={`${item.amount} TCT`}
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
        return (
            <div>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Your requests</Card.Header>
                        <Divider />
                        <Grid verticalAlign={'middle'} className={"dashboard__component"}>
                            <Grid.Row columns={1}>
                                <Grid.Column>
                                    {this.renderList()}
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Content>
                </Card>
            </div>
        )
    }

}

export default connect((state) => ({
    requests: state.requests
}), {})(RequestList);