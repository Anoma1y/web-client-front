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
import { ERROR_VALIDATION, RESET_USER } from 'libs/messages';
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
            setError(ERROR_VALIDATION.PASSWORD_MATCH);
            return;
        } else if (newPassword.length === 0 || repeatNewPassword === 0) {
            setError(ERROR_VALIDATION.PASSWORD_NEW);
            return;
        }
        setError(null);
        if (token !== undefined && tid !== undefined) {
            handleResetNewPassword({tid, token, newPassword});
        } else {
            setError(ERROR_VALIDATION.TOKEN);
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
                <Card fluid color={'violet'} className={"login reset__password component__shadow"}>
                    <Card.Content>
                        <Card.Header as={"h1"} className={"login__header reset__password_header"}>
                            {RESET_USER.NEW_PASSWORD_TITLE}
                        </Card.Header>
                        <Divider className={"auth__divider"}/>
                        <Card.Description style={{marginBottom: 15}} as={"p"}>
                            {RESET_USER.NEW_PASSWORD_TEXT}
                        </Card.Description>
                        <Card.Description>
                            <form action="#" className={"auth_input auth_input-success"}>
                                <label>
                                    <input
                                        type="password"
                                        onChange={this.handleChangeNewPassword}
                                        placeholder='Password'
                                        value={newPassword}
                                        className={this.state.newPassword ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Password</span>
                                </label>
                                <label>
                                    <input
                                        type="password"
                                        placeholder='Repeat password'
                                        onChange={this.handleChangeRepeatNewPassword}
                                        value={repeatNewPassword}
                                        className={this.state.repeatNewPassword ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Repeat password</span>
                                </label>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    className={"auth_btn auth_input-success reset_btn"}
                                    onClick={this.handleResetPassword}
                                    disabled={isResetInProgress === true ? true : false}
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