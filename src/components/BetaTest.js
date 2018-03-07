import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Button,
    Grid,
    List,
    Modal,
    Icon
} from 'semantic-ui-react';
import {
    changeAndroidChecked,
    changeAppleChecked,
    changeSuccessBetatest,
    handleSubscribeToBetaTest,
    handleRejectBetatest,
    changeModalBeta
} from 'actions/betatest';

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
            betaModalIsOpen
        } = this.props.betatest;
        return (
            <Card fluid className={"component__main"}>
                <Card.Content>
                    <Card.Header className={"component__title"}>Beta Test</Card.Header>
                    <Card.Description className={"betatest"}>
                         <Grid>
                             <Grid.Row>
                                 <Grid.Column width={8} className={"betatest__wrapper"}>
                                     <List horizontal>
                                         <List.Item className={androidChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedAndroid}>
                                             <List.Icon name='android' size='large' verticalAlign='middle' />
                                         </List.Item>
                                         <List.Item className={appleChecked ? "betatest__item betatest__item-checked" : "betatest__item"} onClick={this.onCheckedApple}>
                                             <List.Icon name='apple' size='large' verticalAlign='middle' />
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
                                                     <span>{success ? "Your application has been sent" : "Please choose at least one OS platform"}</span>
                                                 </div>
                                                 <div className={success ? "modal__success_btn" : "modal__success_btn modal__success-error"}>
                                                     <Button
                                                         className={"dashboard__submit"}
                                                         onClick={this.handleCloseModal}
                                                         id={"betatest_error"}
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
