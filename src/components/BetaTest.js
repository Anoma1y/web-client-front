import React from 'react'
import {
    Card,
    Form
} from 'semantic-ui-react'

class RequestList extends React.Component {
    render () {
        return (
            <div>
                <Card fluid color={'violet'} style={{marginBottom: "20px"}}>
                    <Card.Content>
                        <Card.Header>Beta Test</Card.Header>
                        <Card.Description>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, tempora?</p>
                            <Form as={"div"}>
                                <Form.Button circular floated={"right"}>
                                    Оставить заявку
                                </Form.Button>
                            </Form>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }

}

export default RequestList;