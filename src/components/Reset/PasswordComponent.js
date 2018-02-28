import React, {Component} from 'react';
import { connect } from "react-redux";
import {
    changeNewPassword,
    changeRepeatNewPassword,
    setResetInProgress,
    setError,
    handleResetNewPassword
} from 'actions/reset';
import {
    Card,
    Input,
    Button,
    Divider,
    Message,
    Loader
} from 'semantic-ui-react';
import _ from "underscore";

class PasswordComponent extends Component {

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
        const {
            setError,
            handleResetNewPassword,
            newPassword,
            repeatNewPassword
        } = this.props;
        const {
            tid,
            token
        } = this.parseURL();
        if (repeatNewPassword !== newPassword) {
            setError("Passwords do not match");
            return;
        } else if (newPassword.length === 0 || repeatNewPassword === 0) {
            setError("Enter a new password");
            return;
        }
        setError(null);
        if (token !== undefined && tid !== undefined) {
            handleResetNewPassword({tid, token, newPassword});
        } else {
            setError("Invalid Token");
        }
    }

    render () {
        const {
            changeNewPassword,
            changeRepeatNewPassword,
            newPassword,
            repeatNewPassword,
            isResetInProgress,
            error
        } = this.props;

        return (
            <div>
                <Card fluid color={'violet'} className={"login"}>
                    <Card.Content>
                        <Card.Header as={"h1"} textAlign={"center"}>New password</Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}} as={"p"}>
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

const mapStateToProps = (state) => ({
    newPassword: state.reset.newPassword,
    repeatNewPassword: state.reset.repeatNewPassword,
    isResetInProgress: state.reset.isResetInProgress,
    error: state.reset.error,
    routing: state.routing
});


export default connect(
    mapStateToProps, {
        changeNewPassword,
        changeRepeatNewPassword,
        setResetInProgress,
        setError,
        handleResetNewPassword
    }
)(PasswordComponent)