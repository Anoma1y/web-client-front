import React, {Component} from 'react'
import {
    Button,
    Grid,
    Item,
    Modal,
    Icon,
    Input
} from 'semantic-ui-react';

class RequestItem extends Component {
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
    state = {
        payModalSuccessful: false
    }

    render() {
        const {sum, amount, buttonDisabled, buttonBasic, buttonColor, buttonText, fixedColor} = this.props;
        const fixedStyleTSR = fixedColor === "TSR";
        const fixedStyleAmount = fixedColor !== "TSR";
        return (
            <Grid verticalAlign={'middle'} className={"request__item"}>
                <Grid.Row className={"request__item_wrapper"}>
                    <Grid.Column widescreen={5} computer={5} tablet={5} mobile={8}>
                        <Item>
                            <Item.Header className={fixedStyleAmount ? "request__item_title request__item_title-active" : "request__item_title"}>Amount</Item.Header>
                            <Item.Description className={fixedStyleAmount ? "request__item_value request__item_value-active" : "request__item_value"}><h3>{sum}</h3></Item.Description>
                        </Item>
                    </Grid.Column>
                    <Grid.Column widescreen={5} computer={5} tablet={5} mobile={8}>
                        <Item>
                            <Item.Header className={fixedStyleTSR ? "request__item_title request__item_title-active" : "request__item_title"}>Tokens</Item.Header>
                            <Item.Description className={fixedStyleTSR ? "request__item_value request__item_value-active" : "request__item_value"}><h3>{amount} </h3></Item.Description>
                        </Item>
                    </Grid.Column>
                    <Grid.Column widescreen={6} computer={6} tablet={6} mobile={16}>
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

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
};

export default RequestItem;