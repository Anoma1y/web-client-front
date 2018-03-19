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
import { initKycType } from 'actions/users';
import { SETTINGS } from 'libs/messages';
import _ from 'underscore';

class SettingsButton extends Component {

    handleSubmit = () => {
        const {
            handleSettingsSend,
            settingsOption,
        } = this.props;
        const { kyc_type } = this.props.user;
        if (kyc_type === settingsOption || kyc_type === '') {
            this.checkCompletenessFields(kyc_type);
            // handleSettingsSend(settingsOption);
        }
    }
    checkEnglish = value => {
        if (value.match(/^[A-Za-z\s]+$|i/) && value.length > 0) return true;
        else return false;
    }
    checkNumber = value => {
        if (value.match(/^[0-9]+$|i/) && value.length > 0) return true;
        else return false;
    }
    checkEmail = value => {
        if (value.match(/^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i) && value.length > 0) return true;
        else return false;
    }
    checkPhone = value => {
        if (value.match(/^((\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{0,15}$/) && value.length > 0) return true;
        else return false;
    }
    checkWeb = value => {
        if (value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) && value.length > 0) return true;
        else return false;
    }


    checkCompletenessFields = (TYPE) => {
        if (TYPE === 'individual') {
            const {
                individualUserFile,
                individualUserInformation
            } = this.props.settings;
            const checkedUserInformation = Object.keys(individualUserInformation).map((item) => {
                if (item === 'Name' || item === 'Surname') {
                    return this.checkEnglish(individualUserInformation[item])
                } else if (item === 'Zip') {
                    return this.checkNumber(individualUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(individualUserInformation[item]);
                } else if (item === 'Phone') {
                    return this.checkPhone(individualUserInformation[item]);
                } else if (item === 'City' || item === 'Addres' || item === 'Country' || item === 'Dateofbirth') {
                    return individualUserInformation[item].length > 0;
                }
            });
            const checkedUserFile = _.every(individualUserFile, (num) => num !== null);
        }
        else if (TYPE === 'legal') {
            const {
                personCompanyFile,
                companyFile,
                beneficialFile,
                companyUserInformation,
                companyInformation,
                beneficial,
                sourceFunds
            } = this.props.settings;

            const checkedCompanyUserInformation = Object.keys(companyUserInformation).map((item) => {
                if (item === 'Name' || item === 'Surname') {
                    return this.checkEnglish(companyUserInformation[item])
                } else if (item === 'Zip') {
                    return this.checkNumber(companyUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(companyUserInformation[item]);
                } else if (item === 'Phone') {
                    return this.checkPhone(companyUserInformation[item]);
                } else if (item === 'City' || item === 'Addres' || item === 'Country' || item === 'Dateofbirth') {
                    return companyUserInformation[item].length > 0;
                }
            });
            const checkedPersonCompanyFile = _.every(personCompanyFile, (num) => num !== null);

            const checkedCompanyInformation = Object.keys(companyInformation).map((item) => {
                if (item === 'companyCompanyName') {
                    return this.checkEnglish(companyInformation[item]);
                } else if (item === 'companyTaxIDnumber' || item === 'companyZip') {
                    return this.checkNumber(companyInformation[item]);
                } else if (item === 'companyWebsites') {
                    return this.checkWeb(companyInformation[item]);
                } else if (item === 'companyEmail') {
                    return this.checkEmail(companyInformation[item]);
                } else if (item === 'companyPhone') {
                    return this.checkPhone(companyInformation[item]);
                } else if (item === 'companyCity' || item === 'companyLegaladdress' || item === 'companyActualbusinessplaceaddress' || item === 'companyDescriptioncompanydoes' || item === 'companyTaxrezidencecountry' || item === 'companyLinktopubliccompanyregister') {
                    return companyInformation[item].length > 0;
                }
            });

            const checkedCompanyFile = _.every(companyFile, (num) => num !== null);

            const checkedSourceFunds = sourceFunds !== 'None';

            const chekedBeneficial = _.every(Object.values(beneficial).map(item => {
                return Object.keys(item).map(it => {
                    if (it === 'Name' || it === 'Surname') {
                        return this.checkEnglish(item[it])
                    } else if (it === 'Zip') {
                        return this.checkNumber(item[it]);
                    } else if (it === 'Email') {
                        return this.checkEmail(item[it]);
                    } else if (it === 'Phone') {
                        return this.checkPhone(item[it]);
                    } else if (it === 'City' || it === 'Addres' || it === 'Country' || it === 'Dateofbirth') {
                        return item[it].length > 0;
                    }
                })
            }).reduce((acc, curr) => acc.concat(curr)), (num) => num === true);
            
            const chekedBeneficialFile = _.every(Object.values(beneficialFile).map(item => Object.keys(item).map(it => item[it] !== null)).reduce((acc, curr) => acc.concat(curr)), (num) => num === true);

        }
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
                        size='tiny'
                    >
                        <Modal.Content className={"modal__success"}>
                            <Modal.Description>
                                <div className={success ? "modal__success_icon" : "modal__success_icon modal__error-icon"}>
                                    <Icon name={success ? "check circle outline" : "warning circle"} />
                                </div>
                                <div className={"modal__success_text betatest__modal_text black-text"}>
                                    <span>{success ? SETTINGS.SUCCESS : settingsError}</span>
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
    initKycType,
    handleSettingsSend
})(SettingsButton);



