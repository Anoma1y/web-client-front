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
            isPasswordVisible: 0,
            newPassword: false,
            repeatNewPassword: false
        };
    }

    parseURL = () => {
        const { search } = this.props.routing.location;
        return _.object(_.compact(_.map(search.slice(1).split('&'), function(item) {  if (item) return item.split('='); })));
    }

    handleResetPassword = event => {
        event.preventDefault();
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
    handleChangeNewPassword = event => {
        const { value } = event.target;
        const { changeNewPassword } = this.props;
        value.length > 0 ? this.setState({ newPassword: true }) : this.setState({ newPassword: false });
        changeNewPassword(value);
    }
    handleChangeRepeatNewPassword = event => {
        const { value } = event.target;
        const { changeRepeatNewPassword } = this.props;
        value.length > 0 ? this.setState({ repeatNewPassword: true }) : this.setState({ repeatNewPassword: false });
        changeRepeatNewPassword(value);
    }
    render () {
        const {
            newPassword,
            repeatNewPassword,
            isResetInProgress,
            error
        } = this.props;

        return (
            <div>
                <Card fluid color={'violet'} className={"login"}>
                    <Card.Content>
                        <Card.Header as={"h1"} className={"login__header"}>
                            New Password
                        </Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}} as={"p"}>
                            Create a new password
                        </Card.Description>
                        <Card.Description>
                            <form action="#" className={"auth_input"}>
                                <label>
                                    <input
                                        type="password"
                                        onChange={this.handleChangeNewPassword}
                                        placeholder='Password'
                                        value={newPassword}
                                        className={this.state.newPassword ? "populated" : ""}
                                    />
                                    <span>Password</span>
                                </label>
                                <label>
                                    <input
                                        type="password"
                                        placeholder='Repeat password'
                                        onChange={this.handleChangeRepeatNewPassword}
                                        value={repeatNewPassword}
                                        className={this.state.repeatNewPassword ? "populated" : ""}
                                    />
                                    <span>'Repeat password'</span>
                                </label>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    className={"auth_btn reset_btn"}
                                    onClick={this.handleResetPassword}
                                >{isResetInProgress ? <Loader active inline size={"mini"}/> : "Send"}
                                </Button>
                            </form>
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