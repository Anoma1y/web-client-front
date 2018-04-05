import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Modal,
    Button,
    Grid,
    Icon,
    Divider,
    Input,
    Loader,
    Dimmer
} from 'semantic-ui-react';
import {
    initialPayInfo,
    handlePaymentInfo
} from 'actions/request';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { REQUEST_PAY } from 'libs/messages';

class RequestModal extends Component {
    state = {
        payModalSuccessful: false,
        copied: false,
    }

    handleRequestBtn = () => {
        const {
            payBan,
            APPLICATION_ID,
            handlePaymentInfo
        } = this.props;
        if (!payBan) {
            handlePaymentInfo(APPLICATION_ID);
            this.setState({
                payModalSuccessful: true
            })
        }
    }

    closePayModal = () => {
        const { initialPayInfo } = this.props;
        initialPayInfo({
            TYPE: '',
            ADDRESS: '',
            EXPECTED_VALUE: null
        });
        this.setState({
            payModalSuccessful: false
        })
    }

    render() {
        const {
            status,
            currencyName,
            payBan
        } = this.props;
        const {
            ADDRESS,
            EXPECTED_VALUE
        } = this.props.requests.payment;
        const { paymentIsLoading } = this.props.requests;
        const text = status === 0 || (status === 1 && currencyName === 'USD') ? 'Processing'
                   : status === 1 && currencyName !== 'USD' ? 'Pay'
                   : status === 2 ? 'Rejected'
                   : status === 3 ? 'Purchased'
                   : '';
        return (
            <Modal trigger={
                status === 1 && currencyName !== 'USD' ?
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
                            {paymentIsLoading &&
                                <Dimmer active inverted>
                                    <Loader size='big' inline> </Loader>
                                </Dimmer>
                            }
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
                                    {paymentIsLoading ? '' : `${EXPECTED_VALUE} ${currencyName}`}
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
                                        {paymentIsLoading ? null :
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${ADDRESS}`}
                                                alt="QR Code"/>
                                        }
                                    </div>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={"pay__address"}>
                                <Grid.Column>
                                    <Input
                                        type="text"
                                        className={"pay__input"}
                                        disabled
                                        value={ADDRESS}/>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row className={"pay__copy"}>
                                <Grid.Column>
                                    <CopyToClipboard text={ADDRESS}>
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

export default connect(state => ({ requests: state.requests }), {
    initialPayInfo,
    handlePaymentInfo
})(RequestModal);
