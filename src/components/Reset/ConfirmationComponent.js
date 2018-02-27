import React, { Component } from 'react'
import {
    Card
} from 'semantic-ui-react'

class ConfirmationComponent extends Component {

    render () {
        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content textAlign={"center"}>
                        <Card.Header>
                            Confirmation your E-Mail
                        </Card.Header>
                        <Card.Description>
                            <p>Please check your inbox for a confirmation email. Click the link in the email to confirm your email address and go to the page to enter a new password.</p>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default ConfirmationComponent