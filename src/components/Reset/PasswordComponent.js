import React from 'react'
import {
    Card,
    Input,
    Button,
    Divider,
    Message,
    Loader
} from 'semantic-ui-react'
import { connect } from "react-redux";

import {
    changeNewPassword,
    changeRepeatNewPassword,
    setResetInProgress,
    setError,
    handleResetNewPassword
} from 'actions/reset'
import _ from "underscore";

class PasswordComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPasswordVisible: 0
        };
    }
    parseURL = () => {
        const { search } = this.props.routing.location;
        return _.object(_.compact(_.map(search.slice(1).split('&'), function(item) {  if (item) return item.split('='); })));
    }

    handleResetPassword = () => {
        const { setError, handleResetNewPassword,newPassword, repeatNewPassword } = this.props;
        const { tid, token } = this.parseURL();
        if (repeatNewPassword === newPassword || newPassword.length > 0) {
            handleResetNewPassword({tid, token, newPassword})
        } else {
            setError("Passwords do not match");
        }

    }
    
    render () {
        const { changeNewPassword, changeRepeatNewPassword, newPassword, repeatNewPassword,isResetInProgress, error } = this.props;
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
                                   onChange={changeNewPassword.bind(this)} value={newPassword}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />
                            <Input icon='repeat' iconPosition='left' placeholder='Repeat password' fluid style={{marginBottom: 15}}
                                   onChange={changeRepeatNewPassword.bind(this)} value={repeatNewPassword}
                                   type={this.state.isPasswordVisible ? 'text' : 'password' }
                            />
                            { error !== null ?
                                <Message warning color={"red"}>
                                    <Message.Header>{error}</Message.Header>
                                </Message> : ""
                            }
                            <Button 
                                fluid
                                onClick={this.handleResetPassword}
                            >{isResetInProgress ? <Loader active inline size={"mini"}/> : "Send"}
                            </Button>
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
        error: state.reset.error,
        routing: state.routing
    };
};


export default connect(
    mapStateToProps, {
        changeNewPassword,
        changeRepeatNewPassword,
        setResetInProgress,
        setError,
        handleResetNewPassword
    }
)(PasswordComponent)