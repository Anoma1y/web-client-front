import React, { Component } from 'react';
import {
    Card
} from 'semantic-ui-react';
import { RESET_USER } from 'libs/messages';

class ConfirmationComponent extends Component {
    render () {
        return (
            <div>
                <Card fluid color={'violet'} className={"login component__shadow"}>
                    <Card.Content textAlign={"center"}>
                        <Card.Header as={"h1"}>
                            {RESET_USER.CONFIRM_EMAIL}
                        </Card.Header>
                        <Card.Description as={"p"}>
                            {RESET_USER.CHECK_EMAIL}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default ConfirmationComponent;