import React, { Component } from 'react';
import {
    Modal,
    Button,
    Grid,
    Icon,
    Input
} from 'semantic-ui-react';

class RequestModal extends Component {

    state = {
        payModalSuccessful: false
    }

    handleRequestBtn = () => {
        this.setState({
            payModalSuccessful: true
        })
    }

    closePayModal = () => {
        this.setState({
            payModalSuccessful: false
        })
    }

    render() {
        const {
            buttonDisabled,
            buttonBasic,
            buttonColor,
            buttonText,
        } = this.props;
        return (
            <Modal trigger={
                <Button
                    className={"dashboard__submit request__item_submit"}
                    onClick={this.handleRequestBtn}
                    disabled={buttonDisabled}
                    basic={buttonBasic}
                    color={buttonColor}
                >
                    {buttonText}
                </Button>
            }
               open={this.state.payModalSuccessful}
               size={"tiny"}
            >
                <Modal.Content className={"pay__modal"}>
                    <Modal.Description>
                        <div className="close__modal">
                            <Icon name={"close"} onClick={this.closePayModal}/>
                        </div>
                        <Grid textAlign={"center"}>
                            <Grid.Row>
                                <Grid.Column>
                                    <p className="pay__header">
                                        Оплата заявки
                                    </p>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className="pay__qrcode">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code"/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"pay__address"}>
                                <Grid.Column>
                                    <Input
                                        type="text"
                                        className={"pay__input"}
                                        disabled
                                        value={"kljqklerjqwj2341234kj3kjqewrsqwe"}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"pay__copy"}>
                                <Grid.Column>
                                    <Button
                                        className={"dashboard__submit"}
                                    >Скопировать адрес
                                    </Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default RequestModal;