import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Button,
    Grid,
    List,
    Modal,
    Icon,
    Divider
} from 'semantic-ui-react';
import {
    changeAndroidChecked,
    changeAppleChecked,
    changeSuccessBetatest,
    handleSubscribeToBetaTest,
    handleRejectBetatest,
    changeModalBeta
} from 'actions/betatest';
import { BETATEST } from 'libs/messages';

class BetaTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false
        }
    }

    onCheckedAndroid = () => {
        const { androidChecked } = this.props.betatest;
        const { changeAndroidChecked } = this.props;
        androidChecked === true ? changeAndroidChecked(false) : changeAndroidChecked(true);
    }

    onCheckedApple = () => {
        const { appleChecked } = this.props.betatest;
        const { changeAppleChecked } = this.props;
        appleChecked === true ? changeAppleChecked(false) : changeAppleChecked(true);
    }

    handleSubscribeBtn = () => {
        const {
            androidChecked,
            appleChecked
        } = this.props.betatest;
        const { handleRejectBetatest, handleSubscribeToBetaTest } = this.props;
        if (androidChecked === false && appleChecked === false) {
            handleRejectBetatest(false);
            return;
        }
        handleSubscribeToBetaTest();
    }

    handleCloseModal = () => {
        const { changeModalBeta } = this.props;
        changeModalBeta(false);
    }

    render () {
        const {
            androidChecked,
            appleChecked,
            success,
            betaModalIsOpen,
            betaTestError
        } = this.props.betatest;
        return (
            <Card fluid className={"component__main component__shadow betatest"}>
                <Card.Content>
                    <Card.Header className={"component__title betatest__title"}>Beta test</Card.Header>
                    <Divider className={"component__divider"} />
                    <Card.Description className={"betatest__wrapper"}>
                        <Grid>
                            <Grid.Row className={"betatest__items"}>
                                <Grid.Column width={8}>
                                    <List horizontal>
                                        <List.Item className={appleChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedApple}>
                                            <List.Icon name='apple' size='large' verticalAlign='middle' />
                                        </List.Item>
                                        <List.Item className={androidChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedAndroid}>
                                            <List.Icon name='android' size='large' verticalAlign='middle' />
                                        </List.Item>
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Modal
                                        trigger={<Button
                                            onClick={this.handleSubscribeBtn}
                                            className={"betatest__submit"}
                                            floated={"right"}
                                        >Apply
                                        </Button>}
                                        open={betaModalIsOpen}
                                        onClose={this.handleClose}
                                        basic
                                        size='small'
                                    >
                                        <Modal.Content className={"modal__success"}>
                                            <Modal.Description>
                                                <div className={success ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                                                    <Icon name={success ? "check circle outline" : "warning circle"} />
                                                </div>
                                                <div className={"modal__success_text betatest__modal_text"}>
                                                    <span>{success ? BETATEST.SUCCESS : betaTestError}</span>
                                                </div>
                                                <div className={success ? "modal__success_btn" : "modal__success_btn modal__success-error"}>
                                                    <Button
                                                        className={"dashboard__submit"}
                                                        onClick={this.handleCloseModal}
                                                        id={success ? "betatest_success" : "betatest_error"}
                                                    >OK
                                                    </Button>
                                                </div>
                                            </Modal.Description>
                                        </Modal.Content>
                                    </Modal>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(state => ({ betatest: state.betatest }), {
    changeAndroidChecked,
    changeAppleChecked,
    changeSuccessBetatest,
    handleSubscribeToBetaTest,
    handleRejectBetatest,
    changeModalBeta
})(BetaTest);
