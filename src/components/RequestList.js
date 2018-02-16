import React from 'react'
import { connect } from 'react-redux'
import { Card, Divider } from 'semantic-ui-react'

import RequestItem from 'components/RequestItem'

class RequestList extends React.Component {
    renderList () {
        return this.props.requests.items.map((item, i) => {
            let btnOptions = { color: 'grey', text: 'В обработке', callback: () => {} };

            switch (item.status) {
                case 0:
                    btnOptions = { color: 'grey', text: 'В обработке', callback: () => {} };
                    break;
                case 1:
                    btnOptions = { color: 'orange', text: 'Оплатить', callback: () => {} };
                    break;
                case 2:
                    btnOptions = { color: 'grey', text: 'Оплачено', callback: () => {} };
            }
            return (
                <Card.Description key={i}>
                    <Divider />
                    <RequestItem
                        sum={`${item.sum} ${item.currency}`}
                        amount={`${item.amount} TCT`}
                        buttonText={btnOptions.text}
                        buttonColor={btnOptions.color}
                        buttonDisabled={item.status !== 1}
                        buttonInverted={item.status === 1}
                    />
                </Card.Description>
            )
        })
    }

    render () {
        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Header>Ваши заявки</Card.Header>
                        {this.renderList()}
                    </Card.Content>
                </Card>
            </div>
        )
    }

}

export default connect((state) => ({
    requests: state.requests
}), {})(RequestList);