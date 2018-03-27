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
import { SETTINGS } from 'libs/messages';
import { LIMIT } from 'libs/validation';
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
            return ((days < 6574 && days > 0)
                || Math.sign(days) === -1
                || Number(DATE.DAY) > 31
                || Number(DATE.MONTH) > 12
                || days > 36525
                || Number(DATE.MONTH) === 0
                || Number(DATE.DAY) === 0
                || Number(DATE.YEAR) === 0 ) !== true;
        } else if (value.length >= 0 || value.length < 10) {
            return false;
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
                if (item === 'Name') {
                    return this.checkEnglish(individualUserInformation[item]) && individualUserInformation[item].length <= LIMIT.NAME.MAX;
                } else if (item === 'Surname') {
                    return this.checkEnglish(individualUserInformation[item]) && individualUserInformation[item].length <= LIMIT.SURNAME.MAX;
                } else if (item === 'Zip') {
                    return this.checkZip(individualUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(individualUserInformation[item]) && individualUserInformation[item].length <= LIMIT.EMAIL.MAX;
                } else if (item === 'Phone') {
                    return this.checkPhone(individualUserInformation[item]) && individualUserInformation[item].length >= 1;
                } else if (item === 'Dateofbirth') {
                    return this.checkAge(individualUserInformation[item]);
                } else if (item === 'City') {
                    return individualUserInformation[item].length > 0 && individualUserInformation[item].length <= LIMIT.CITY.MAX;
                } else if (item === 'Addres') {
                    return individualUserInformation[item].length > 0 && individualUserInformation[item].length <= LIMIT.ADDRESS.MAX;
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
                if (item === 'Name') {
                    return this.checkEnglish(companyUserInformation[item]) && companyUserInformation[item].length <= LIMIT.NAME.MAX;
                } else if (item === 'Surname') {
                    return this.checkEnglish(companyUserInformation[item]) && companyUserInformation[item].length <= LIMIT.SURNAME.MAX;
                } else if (item === 'Zip') {
                    return this.checkZip(companyUserInformation[item]);
                } else if (item === 'Email') {
                    return this.checkEmail(companyUserInformation[item]) && companyUserInformation[item].length <= LIMIT.EMAIL.MAX;
                } else if (item === 'Phone') {
                    return this.checkPhone(companyUserInformation[item]) && companyUserInformation[item].length >= 1;
                } else if (item === 'Dateofbirth') {
                    return this.checkAge(companyUserInformation[item]);
                } else if (item === 'City') {
                    return companyUserInformation[item].length > 0 && companyUserInformation[item].length <= LIMIT.CITY.MAX;
                } else if (item === 'Addres') {
                    return companyUserInformation[item].length > 0 && companyUserInformation[item].length <= LIMIT.ADDRESS.MAX;
                } else if (item === 'Country') {
                    return companyUserInformation[item].length > 0;
                }
            }), (num) => num === true);

            const checkedFillCompanyUserInformation = _.every(Object.keys(companyUserInformation).map((item) => {
                return this.checkFill(companyUserInformation[item]);
            }), (num) => num === true);

            const checkedPersonCompanyFile = _.every(personCompanyFile, (num) => num !== null);

            const checkedValidationCompanyInformation = _.every(Object.keys(companyInformation).map((item) => {
                if (item === 'companyCompanyName') {
                    return this.checkEnglish(companyInformation[item]) && companyInformation[item].length <= LIMIT.COMPANY_NAME.MAX;
                } else if (item === 'companyTaxIDnumber') {
                    return this.checkNumber(companyInformation[item]);
                } else if (item === 'companyZip') {
                    return this.checkZip(companyInformation[item]);
                } else if (item === 'companyWebsites') {
                    return this.checkWeb(companyInformation[item]) && companyInformation[item].length <= LIMIT.WEBSITE.MAX;
                } else if (item === 'companyEmail') {
                    return this.checkEmail(companyInformation[item]) && companyInformation[item].length <= LIMIT.EMAIL.MAX;
                } else if (item === 'companyPhone') {
                    return this.checkPhone(companyInformation[item]);
                } else if (item === 'companyCity') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= LIMIT.CITY.MAX;
                } else if (item === 'companyLegaladdress') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= LIMIT.LEGAL_ADDRESS.MAX;
                } else if (item === 'companyActualbusinessplaceaddress') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= LIMIT.ACTUAL_BUSINESS_ADDRESS.MAX;
                } else if (item === 'companyDescriptioncompanydoes') {
                    return companyInformation[item].length > 0 && companyInformation[item].length <= LIMIT.DESCRIPTION_COMPANY_DOES.MAX;
                } else if (item === 'companyLinktopubliccompanyregister') {
                    return (this.checkWeb(companyInformation[item]) || companyInformation[item].length === 0) && companyInformation[item].length <= LIMIT.LINK_TO_PUBLIC_COMPANY_REGISTER.MAX;
                } else if (item === 'companyTaxrezidencecountry') {
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
                    if (it === 'Name') {
                        return this.checkEnglish(item[it]) && item[it].length <= LIMIT.NAME.MAX;
                    } else if (it === 'Surname') {
                        return this.checkEnglish(item[it]) && item[it].length <= LIMIT.SURNAME.MAX;
                    } else if (it === 'Zip') {
                        return this.checkZip(item[it]);
                    } else if (it === 'Email') {
                        return this.checkEmail(item[it]) && item[it].length <= LIMIT.EMAIL.MAX;
                    } else if (it === 'Phone') {
                        return this.checkPhone(item[it]) && item[it].length >= 1;
                    } else if (it === 'Dateofbirth') {
                        return this.checkAge(item[it]);
                    } else if (it === 'City') {
                        return item[it].length > 0 && item[it].length <= LIMIT.CITY.MAX;
                    } else if (it === 'Addres') {
                        return item[it].length > 0 && item[it].length <= LIMIT.ADDRESS.MAX;
                    } else if (it === 'Country') {
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

    handleCloseModalSuccess = () => {
        const { changeModalSettings } = this.props;
        changeModalSettings(false);
        // window.location.reload();
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
                                                    onClick={this.handleCloseModalSuccess}
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



