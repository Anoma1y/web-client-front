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
                            Confirmation your EMail
                        </Card.Header>
                        <Card.Description as={"p"}>
                            Please check your inbox for a confirmation email. Click the link in the email to confirm your email address and go to the page to enter a new password.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default ConfirmationComponent;