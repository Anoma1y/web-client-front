import React, { Component } from 'react';
import {
    Modal,
    Button,
    Grid,
    Icon,
    Divider,
    Input
} from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { REQUEST_PAY } from 'libs/messages';

class RequestModal extends Component {

    state = {
        payModalSuccessful: false,
        value: 'kljqklerjqwj2341234kj3kjqewrsqwe',
        copied: false
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
            currencyAmount,
            currencyName
        } = this.props;
        return (
            <Modal trigger={
                <Button
                    className={`dashboard__submit request__item_submit ${buttonColor === "red" ? "request__item-rejected" : buttonColor === "green" ? "request__item-paid" : buttonColor === "blue" ? "request__item-pay" : ""}`}
                    onClick={this.handleRequestBtn}
                    disabled={buttonDisabled}
                    basic={buttonBasic}
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
                            <Grid.Row className={'pay__wrapper'}>
                                <Grid.Column>
                                    <p className="pay__header">
                                        {REQUEST_PAY.HEADER}
                                    </p>
                                    <Divider className={"component__divider"} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={'pay__amount'}>
                                <Grid.Column width={8} className={'pay__amount_text'}>
                                    Amount
                                </Grid.Column>
                                <Grid.Column width={8} className={'pay__amount_currency'}>
                                    {`${currencyAmount} ${currencyName}`}
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={'pay__wrapper'}>
                                <Grid.Column>
                                    <Divider className={"component__divider"} />
                                    <p className="pay__text">
                                        {REQUEST_PAY.TEXT}
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
                                    <CopyToClipboard
                                        text={this.state.value}
                                    >
                                        <Button className={'dashboard__submit'}>Скопировать адрес</Button>
                                    </CopyToClipboard>
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