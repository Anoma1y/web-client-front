import React, { Component } from 'react';
import {
    Card
} from 'semantic-ui-react';

class ConfirmationComponent extends Component {
    render () {
        return (
            <div>
                <Card fluid color={'violet'} className={"login"}>
                    <Card.Content textAlign={"center"}>
                        <Card.Header as={"h1"}>
                            Confirmation your Email
                        </Card.Header>
                        <Card.Description as={"p"}>
                            Please check your inbox for an email with instructions for how to reset your password
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default ConfirmationComponent;