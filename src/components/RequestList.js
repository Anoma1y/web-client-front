import React from 'react'
import { connect } from 'react-redux'
import {
    Card,
    Divider,
    Grid
} from 'semantic-ui-react'

import RequestItem from 'components/RequestItem'

class RequestList extends React.Component {
    renderList () {
        console.log(this.props.requests.items.length)
        return this.props.requests.items.map((item, i) => {
            let btnOptions = null;

            switch (item.status) {
                case 0:
                    btnOptions = { color: 'grey', text: 'В обработке', callback: () => {} };
                    break;
                case 1:
                    btnOptions = { color: 'orange', text: 'Оплатить', callback: () => {} };
                    break;
                case 2:
                    btnOptions = { color: 'grey', text: 'Оплачено', callback: () => {} };
                    break;
                default:
                    btnOptions = { color: 'grey', text: 'В обработке', callback: () => {} };
            }
            return (

                <Card.Description key={i}>
                    <RequestItem
                        sum={`${item.sum} ${item.currency}`}
                        amount={`${item.amount} TCT`}
                        buttonText={btnOptions.text}
                        buttonColor={btnOptions.color}
                        buttonDisabled={item.status !== 1}
                        buttonInverted={item.status === 1}
                    />
                    {i != this.props.requests.items.length - 1 ? <Divider className={"white__divider"} /> : ""}
                </Card.Description>

            )
        })
    }

    render () {
        return (
            <div>
                <Card fluid>
                    <Card.Content>
                        <Card.Header>Ваши заявки</Card.Header>
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