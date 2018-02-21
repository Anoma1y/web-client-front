import React from 'react'
import {
    Card,
    Form
} from 'semantic-ui-react'

class RequestList extends React.Component {
    render () {
        return (
            <Card fluid color={'violet'} className={"component__main"}>
                <Card.Content>
                    <Card.Header>Beta Test</Card.Header>
                    <Card.Description>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, tempora?</p>
                        <Form as={"div"}>
                            <Form.Button circular color={"orange"} floated={"right"} className={"betaTest__button"}>
                                Оставить заявку
                            </Form.Button>
                        </Form>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }

}

export default RequestList;