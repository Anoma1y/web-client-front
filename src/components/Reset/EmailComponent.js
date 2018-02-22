import React from 'react'
import { Card, Input, Button, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

import {
    changeEmail,
    setResetInProgress,
    setError
} from 'actions/reset'

class EmailComponent extends React.Component {
    render () {
        return (
            <div>
                <Card fluid color={'violet'}>
                    <Card.Content>
                        <Card.Header>Востановление пароля</Card.Header>
                        <Divider />
                        <Card.Description style={{marginBottom: 15}}>
                            Введите вашу почту и мы вышлим Вам ссылка на форму для востановления пароля
                        </Card.Description>
                        <Card.Description>
                            <Input icon='at' iconPosition='left' placeholder='E-mail' fluid style={{marginBottom: 15}}
                                   onChange={this.props.changeEmail.bind(this)} value={this.props.email}
                            />
                            <Button fluid>Отправить</Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email: state.reset.email,
        isResetInProgress: state.reset.isResetInProgress,
        error: state.reset.error
    };
};


export default connect(
    mapStateToProps, {
        changeEmail,
        setResetInProgress,
        setError,
    }
)(EmailComponent)