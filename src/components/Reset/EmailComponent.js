import React, { Component } from 'react';
import {
    Card,
    Button,
    Divider,
    Message,
    Loader
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
    changeEmail,
    setResetInProgress,
    setError,
    handleReset
} from 'actions/reset'
import { RESET_USER, ERROR_VALIDATION } from "libs/messages";

class EmailComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailPlaceholder: false,
        };
    }
    handleChangeEmail = event => {
        const { changeEmail } = this.props;
        const { value } = event.target;
        if (value.length > 0) {
            this.setState({
                emailPlaceholder: true
            })
        } else {
            this.setState({
                emailPlaceholder: false
            })
        }
        changeEmail(value);
    }
    handleResetBtn = event => {
        event.preventDefault();
        const {
            email,
            handleReset,
            setError
        } = this.props;
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!email.match(pattern)) {
            setError(ERROR_VALIDATION.EMAIL);
            return;
        }
        handleReset();
    }

    render () {
        const {
            email,
            error,
            isResetInProgress
        } = this.props;
        const { emailPlaceholder } = this.state;
        return (
            <div>
                <Card fluid className={"login reset__password component__shadow"}>
                    <Card.Content>
                        <Card.Header as={"h1"} className={"login__header reset__password_header"}>
                            {RESET_USER.TITLE}
                        </Card.Header>
                        <Divider  className={"reset__divider"}/>
                        <Card.Description>
                            {RESET_USER.RESET_TEXT}
                        </Card.Description>
                        <Card.Description className={"auth_input auth_input-success reset__password_content"}>
                            <form action="#">
                                <label>
                                    <input
                                        type="text"
                                        placeholder='Email'
                                        onChange={this.handleChangeEmail}
                                        value={email}
                                        className={emailPlaceholder ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                </label>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    fluid
                                    className={"auth_btn"}
                                    disabled={isResetInProgress === true ? true : false}
                                    onClick={this.handleResetBtn}
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
    email: state.reset.email,
    isResetInProgress: state.reset.isResetInProgress,
    error: state.reset.error
});

export default connect(
    mapStateToProps, {
        changeEmail,
        setResetInProgress,
        setError,
        handleReset
    }
)(EmailComponent)