import React from 'react';
import {
    Card,
    Input,
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

class EmailComponent extends React.Component {

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
            setError("Please enter a valid Email");
            return;
        }
        handleReset(email);
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
                <Card fluid className={"login"}>
                    <Card.Content>
                        <Card.Header as={"h1"} className={"login__header"}>
                            Forgot your password?
                        </Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}}>
                            No problem! Just fill in the email below and we'll send you password reset instructions!
                        </Card.Description>
                        <Card.Description className={"auth_input"}>
                            <form action="#">
                                <label>
                                    <input
                                        type="text"
                                        placeholder='EMail'
                                        onChange={this.handleChangeEmail}
                                        value={email}
                                        className={emailPlaceholder ? "populated" : ""}
                                    />
                                    <span>EMail</span>
                                </label>
                                { error !== null ?
                                    <Message warning color={"red"}>
                                        <Message.Header>{error}</Message.Header>
                                    </Message> : ""
                                }
                                <Button
                                    fluid
                                    className={"auth_btn"}
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