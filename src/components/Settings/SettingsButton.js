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
    handleSettingsSend,
    changeSettingsInputError,
} from 'actions/settings';
import {ERROR_VALIDATION, SETTINGS} from 'libs/messages';
import _ from 'underscore';

class SettingsButton extends Component {

    handleSubmit = () => {
        const {
            settingsOption,
        } = this.props;
        const { kyc_type } = this.props.user;
        if (kyc_type === '') {
            const { activeTab } = this.props.settings;
            this.checkCompletenessFields(activeTab);
        } else if (kyc_type === settingsOption ) {
            this.checkCompletenessFields(kyc_type);
        }
    }
    checkFill = value => value.length > 0;
    checkEnglish = value => value.match(/^[A-Za-z\s]+$|i/) !== null
    checkNumber = value => value.match(/^[0-9]+$|i/) !== null
    checkEmail = value => value.match(/^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i) !== null;
    checkPhone = value => value.match(/^((\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{0,15}$/) !== null
    checkWeb = value => value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) !== null
    checkZip = value => (value.match(/^[0-9a-zA-Z]+$|i/) && value.length >= 4)
    checkAge = (value) => {
        if (value.length === 10) {
            const DATE = {
                DAY: value.split('.')[0],
                MONTH: value.split('.')[1],
                YEAR: value.split('.')[2]
            };
            let CHECK_MINIMUM_AGE = DATE.YEAR + ", " + DATE.MONTH + ", " + DATE.DAY;
            let d1 = new Date(CHECK_MINIMUM_AGE);
            let d2 = new Date();
            let days = (d2 - d1)/(1000*60*60*24);
            if ((days < 6570 && days > 0) || Math.sign(days) === -1 || Number(DATE.DAY) > 31 || Number(DATE.MONTH) > 12 || days > 36200 ) {
                // this.setState({
                //     [nameError]: ERROR_VALIDATION.BIRTHDAY.UNDER
                // });
            }
        } else if (value.length >= 0 || value.length < 10) {
            // this.setState({
            //     [nameError]: ERROR_VALIDATION.BIRTHDAY.NO_VALID
            // });
        }
    }
    checkCompletenessFields = (TYPE) => {
        if (TYPE === 'individual') {
            const {
                individualUserFile,
                individualUserInformation
            } = this.props.settings;
            const {
                changeSettingsInputError,
                handleSettingsSend
            } = this.props;
            const checkedValidationUserInformation = _.every(Object.keys(individualUserInformation).map((item) => {
                if (item === 'Name' || item === 'Surname') {
                    return this.checkEnglish(individualUserInformation[item])
                } else if (item === 'Zip') {
                    return this.checkZip(individualUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(individualUserInformation[item]);
                } else if (item === 'Phone') {
                    return this.checkPhone(individualUserInformation[item]);
                } else if (item === 'Dateofbirth') {
                    return this.checkAge(individualUserInformation[item]);
                } else if (item === 'City') {
                    return individualUserInformation[item].length > 0 && individualUserInformation[item].length <= 100;
                } else if (item === 'Addres') {
                    return individualUserInformation[item].length > 0 && individualUserInformation[item].length <= 2000;
                } else if (item === 'Country') {
                    return individualUserInformation[item].length > 0;
                }
            }), num => num === true);

            const checkedFillUserInformation = _.every(Object.keys(individualUserInformation).map((item) => {
                return this.checkFill(individualUserInformation[item]);
            }), (num) => num === true);

            const checkedPersonCompanyFile = _.every(individualUserFile, (num) => num !== null);

            if (checkedFillUserInformation === true && checkedPersonCompanyFile === true) {
                if (checkedValidationUserInformation === true) {
                    changeSettingsInputError(null);
                    handleSettingsSend(TYPE);
                } else {
                    changeSettingsInputError(SETTINGS.VALID_INPUT);
                }
            } else {
                changeSettingsInputError(SETTINGS.FILL_INPUT);
            }
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
            const {
                handleSettingsSend,
                changeSettingsInputError
            } = this.props;
            const checkedValidationCompanyUserInformation = _.every(Object.keys(companyUserInformation).map((item) => {
                if (item === 'Name' || item === 'Surname') {
                    return this.checkEnglish(companyUserInformation[item])
                } else if (item === 'Zip') {
                    return this.checkZip(companyUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(companyUserInformation[item]);
                } else if (item === 'Phone') {
                    return this.checkPhone(companyUserInformation[item]);
                } else if (item === 'City') {
                    return companyUserInformation[item].length > 0 && companyUserInformation[item].length <= 100;
                } else if (item === 'Addres') {
                    return companyUserInformation[item].length > 0 && companyUserInformation[item].length <= 2000;
                } else if (item === 'Country' || item === 'Dateofbirth') {
                    return companyUserInformation[item].length > 0;
                }
            }), (num) => num === true);

            const checkedFillCompanyUserInformation = _.every(Object.keys(companyUserInformation).map((item) => {
                return this.checkFill(companyUserInformation[item]);
            }), (num) => num === true);

            const checkedPersonCompanyFile = _.every(personCompanyFile, (num) => num !== null);

            const checkedValidationCompanyInformation = _.every(Object.keys(companyInformation).map((item) => {
                if (item === 'companyCompanyName') {
                    return this.checkEnglish(companyInformation[item]);
                } else if (item === 'companyTaxIDnumber') {
                    return this.checkNumber(companyInformation[item]);
                } else if (item === 'companyZip') {
                    return this.checkZip(companyInformation[item]);
                } else if (item === 'companyWebsites') {
                    return this.checkWeb(companyInformation[item]);
                } else if (item === 'companyEmail') {
                    return this.checkEmail(companyInformation[item]);
                } else if (item === 'companyPhone') {
                    return this.checkPhone(companyInformation[item]);
                } else if (item === 'companyCity') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= 100;
                } else if (item === 'companyLegaladdress') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= 2000;
                } else if (item === 'companyActualbusinessplaceaddress') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= 2000;
                } else if (item === 'companyDescriptioncompanydoes') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= 4500;
                } else if (item === 'companyTaxrezidencecountry' || item === 'companyLinktopubliccompanyregister') {
                    return companyInformation[item].length > 0;
                }
            }), (num) => num === true);

            const checkedFillCompanyInformation = _.every(Object.keys(companyInformation).map((item) => {
                if (item !== 'companyLinktopubliccompanyregister') {
                    return this.checkFill(companyInformation[item]);
                }
            }).filter(item => item !== undefined), num => num === true);

            const checkedCompanyFile = _.every(companyFile, (num) => num !== null);

            const checkedSourceFunds = sourceFunds !== 'None';

            const checkedValidationBeneficial = Object.values(beneficial).map(item => {
                return Object.keys(item).map(it => {
                    if (it === 'Name' || it === 'Surname') {
                        return this.checkEnglish(item[it])
                    } else if (it === 'Zip') {
                        return this.checkZip(item[it]);
                    } else if (it === 'Email') {
                        return this.checkEmail(item[it]);
                    } else if (it === 'Phone') {
                        return this.checkPhone(item[it]);
                    } else if (it === 'City') {
                        return item[it].length > 0 && item[it].length <= 100;
                    } else if (it === 'Addres') {
                        return item[it].length > 0 && item[it].length <= 2000;
                    } else if (it === 'Country' || it === 'Dateofbirth') {
                        return item[it].length > 0;
                    }
                })
            }).map(item => _.every(item, num => num === true))

            const checkedFillBeneficial = _.every(Object.keys(beneficial[0]).map(item => {
                return this.checkFill(beneficial[0][item]);
            }), num => num === true);
            
            const checkedBeneficialFile = Object.values(beneficialFile).map(item => Object.keys(item).map(it => item[it] !== null)).map(item => _.every(item, num => num === true));
            if (checkedBeneficialFile[0] === true
                && checkedFillBeneficial === true
                && checkedSourceFunds === true
                && checkedCompanyFile === true
                && checkedPersonCompanyFile === true
                && checkedFillCompanyUserInformation === true
                && checkedFillCompanyInformation === true
            ) {
                if(checkedValidationBeneficial[0] === true
                   && checkedValidationCompanyInformation === true
                   && checkedValidationCompanyUserInformation === true
                ) {
                    changeSettingsInputError(null);
                    handleSettingsSend(TYPE);
                } else {
                    changeSettingsInputError(SETTINGS.VALID_INPUT);
                }
            } else {
                changeSettingsInputError(SETTINGS.FILL_INPUT);
            }

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
            settingsInputError,
            success
        } = this.props.settings;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider className={'setting_divider'}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8} className={'error__validation'}>
                                { settingsInputError !== null ? <span className={'error__validation_text'}>{settingsInputError}</span> : null }
                            </Grid.Column>
                            <Grid.Column width={8}>
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
                    </Grid>
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
    handleSettingsSend,
    changeSettingsInputError
})(SettingsButton);



