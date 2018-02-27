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

    handleResetBtn = () => {
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
            changeEmail,
            isResetInProgress
        } = this.props;

        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Header>Forgot your password?</Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}}>
                            No problem! Just fill in the email below and we'll send you password reset instructions!
                        </Card.Description>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={changeEmail.bind(this)} value={email}
                            />
                            { error !== null ?
                                <Message warning color={"red"}>
                                    <Message.Header>{error}</Message.Header>
                                </Message> : ""
                            }
                            <Button
                                fluid
                                onClick={this.handleResetBtn}
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