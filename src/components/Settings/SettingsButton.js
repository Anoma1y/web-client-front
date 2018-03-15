import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider,
    Button,
    Modal,
    Icon
} from 'semantic-ui-react';
import {
    changeModalSettings,
    handleSettingsSend
} from 'actions/settings';

class SettingsButton extends Component {

    handleSubmit = () => {
        const {
            handleSettingsSend,
            settingsOption
        } = this.props;
        handleSettingsSend(settingsOption);
    }

    handleCloseModal = () => {
        const { changeModalSettings } = this.props;
        changeModalSettings(false);
    }


    render() {
        const {
            settingsModalIsOpen,
            settingsError,
            success
        } = this.props.settings;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Divider className={'setting_divider'}/>
                    <Modal
                        trigger={
                            <Button
                                className={'setting__button auth_btn setting__submit'}
                                fluid
                                floated={'right'}
                                onClick={this.handleSubmit}
                            > Submit
                            </Button>
                        }
                        open={settingsModalIsOpen}
                        onClose={this.handleCloseModal}
                        basic
                        size='small'
                    >
                        <Modal.Content className={"modal__success"}>
                            <Modal.Description>
                                <div className={success ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                                    <Icon name={success ? "check circle outline" : "warning circle"} />
                                </div>
                                <div className={"modal__success_text betatest__modal_text"}>
                                    <span>{success ? "We have received your details, thank you. We’ll review all KYC requests together with approving applications. So if you receive a link to pay for your applications that means you successfully passed the KYC procedure. Please note that we might ask you to share some additional details." : settingsError}</span>
                                </div>
                                <div className={success ? "modal__success_btn" : "modal__success_btn modal__success-error"}>
                                    <Button
                                        className={"dashboard__submit"}
                                        onClick={this.handleCloseModal}
                                        id={success ? "kycSendSuccess" : "kycSendError"}
                                    >OK
                                    </Button>
                                </div>
                            </Modal.Description>
                        </Modal.Content>
                    </Modal>



                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default connect(state => ({
    settings: state.settings,
    user: state.user
}), {
    changeModalSettings,
    handleSettingsSend
})(SettingsButton);



