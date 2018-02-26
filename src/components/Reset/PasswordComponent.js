import React from 'react'
import { Card, Input, Button, Divider } from 'semantic-ui-react'
import { connect } from "react-redux";

import {
    changeNewPassword,
    changeRepeatNewPassword,
    setResetInProgress,
    setError
} from 'actions/reset'

class PasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: 0
        };
    }

    render () {
        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Header>New password</Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}}>
                            Create a new password
                        </Card.Description>
                        <Card.Description>
                            <Input icon='key' iconPosition='left' placeholder='Password' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeNewPassword.bind(this)} value={this.props.newPassword}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />
                            <Input icon='repeat' iconPosition='left' placeholder='Repeat password' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeRepeatNewPassword.bind(this)} value={this.props.repeatNewPassword}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />
                            <Button fluid>Send</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        newPassword: state.reset.newPassword,
        repeatNewPassword: state.reset.repeatNewPassword,
        isResetInProgress: state.reset.isResetInProgress,
        error: state.reset.error
    };
};


export default connect(
    mapStateToProps, {
        changeNewPassword,
        changeRepeatNewPassword,
        setResetInProgress,
        setError,
    }
)(PasswordComponent)