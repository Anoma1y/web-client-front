import React from 'react'
import { Card, Divider} from 'semantic-ui-react'

import RequestItem from 'components/RequestItem'

const Request = (props) => (
    <div>
        <Card fluid color={'violet'}>
            <Card.Content>
                <Card.Header>Ваши заявки</Card.Header>
                <Divider />
                <Card.Description>
                    <RequestItem
                        sum={'3 BTC'}
                        amount={'12786'}
                        buttonText={'Оплатить'}
                        buttonColor={'orange'}
                        buttonInverted
                    />
                </Card.Description>
                <Divider />
                <Card.Description>
                    <RequestItem
                        sum={'1000 $'}
                        amount={'1956'}
                        buttonText={'В обработке'}
                        buttonDisabled
                    />
                </Card.Description>
            </Card.Content>
        </Card>
    </div>
);

export default Request;