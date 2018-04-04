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
        ADDRESS_VALUE: 'kljqklerjqwj2341234kj3kjqewrsqwe',
        copied: false,
        QR_SRC: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
    }

    handleRequestBtn = () => {
        const { payBan } = this.props;
        if (payBan) {
            return;
        }
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
            currencyAmount,
            currencyName,
            status,
            payBan
        } = this.props;
        const {
            ADDRESS_VALUE,
            QR_SRC
        } = this.state;
        const text = status === 0 ? 'Processing'
                   : status === 1 ? 'Pay'
                   : status === 2 ? 'Rejected'
                   : status === 3 ? 'Purchased'
                   : '';
        return (
            <Modal trigger={
                status === 1 ?
                    <Button
                        className={`dashboard__submit request__item_submit request__item-pay`}
                        disabled={payBan}
                        onClick={this.handleRequestBtn}
                    >{text}</Button>
                    :
                        <p className={`request__item_submit ${status === 2 ? "request__item-rejected"
                                                             : status === 3 ? "request__item-paid"
                                                             : "request__item-processing"}`}>{text}</p>
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
                                    <p className="pay__text">{REQUEST_PAY.TEXT}</p>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <div className="pay__qrcode">
                                        <img src={QR_SRC} alt="QR Code"/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={"pay__address"}>
                                <Grid.Column>
                                    <Input
                                        type="text"
                                        className={"pay__input"}
                                        disabled
                                        value={ADDRESS_VALUE}/>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={"pay__copy"}>
                                <Grid.Column>
                                    <CopyToClipboard text={ADDRESS_VALUE}>
                                        <Button className={'dashboard__submit'}>COPY ADDRESS</Button>
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