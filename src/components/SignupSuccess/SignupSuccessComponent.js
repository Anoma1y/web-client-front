import React, { Component } from 'react';
import { Card, Input, Button } from 'semantic-ui-react';
import { push } from 'react-router-redux';


class SignupSuccessComponent extends Component {
    render () {
        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Description style={{textAlign: "center"}}>
                            <h1>You have registered</h1>
                            <h3>A confirmation email has been sent to your email</h3>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

export default SignupSuccessComponent