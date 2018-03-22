import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeSettingsCompanyInput,
    changeSourceFunds
} from 'actions/settings';
import {
    Grid,
    Dropdown
} from 'semantic-ui-react';
import {countryOptions} from "libs/country";
import {ERROR_VALIDATION, SETTINGS} from 'libs/messages';
import InputMask from 'react-input-mask';

class CompanyInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            certifyOption: [
                {key: '0', value: 'None', text: 'None'},
                {key: '1', value: 'Proceeds from commercial activity', text: 'Proceeds from commercial activity'},
                {key: '2', value: 'Credit funds', text: 'Credit funds'},
                {key: '3', value: 'Company profits', text: 'Company profits'},
                {key: '4', value: 'Sale of property', text: 'Sale of property'},
                {key: '5', value: 'Proceeds from the sale of securities, investment activities', text: 'Proceeds from the sale of securities, investment activities'},
                {key: '6', value: 'Other - specify', text: 'Other - specify'}
            ],
            nameError: '',
            taxIDError: '',
            zipError: '',
            taxResidError: '',
            companyRegError: '',
            emailError: '',
            phoneError: '',
            linkURLError: '',
            webSiteError: '',

        }
    }
    checkEnglish = (value, nameError, len) => {
        if (!value.match(/^[A-Za-z\s]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.ENGLISH
            })
        } else {
            this.setState({
                [nameError]: ''
            })
        }
        if (value.length > len) {
            return false;
        }
    }

    checkOnlyNumber = (value, nameError, len) => {
        if (!value.match(/^[0-9]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.NUMBER
            })
        } else {
            this.setState({
                [nameError]: ''
            })
        }
        if (value.length > len) {
            return false;
        }
    }

    checkPhone = (value, nameError, len) => {
        const pattern = /^((\+\d)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{0,15}$/;
        if (!value.match(pattern)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.PHONE
            });
        } else {
            this.setState({
                [nameError]: ''
            })
        }
        if (value.length > len) {
            return false;
        }
    }
    checkZip = (value, nameError, minLen, maxLen) => {
        if (!value.match(/^[0-9a-zA-Z]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.ZIP
            });
        } else if (value.length < minLen) {
            this.setState({
                [nameError]: ERROR_VALIDATION.ZIPLENGTH
            });
        } else {
            this.setState({
                [nameError]: ''
            });
        }
        if (value.length > maxLen) {
            return false;
        }
    }
    checkEmail = (value, len) => {
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!value.match(pattern)) {
            this.setState({
                emailError: ERROR_VALIDATION.EMAIL
            });
        } else {
            this.setState({
                emailError: ''
            })
        }
        if (value.length > len) {
            return false;
        }
    }

    checkWebURL = (value, webError ,len) => {
        const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        if (!value.match(pattern)) {
            this.setState({
                [webError]: ERROR_VALIDATION.URL
            });
        } else {
            this.setState({
                [webError]: ''
            })
        }
        if (value.length > len) {
            return false;
        }
    }
    checkAge = (value, nameError) => {
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
            if ((days < 6570 && days > 0) || days > 36200) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.AGE
                });
            } else if (Math.sign(days) === -1) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.NO_VALID
                });
            } else {
                this.setState({
                    [nameError]: ''
                });
            }
        } else if (value.length >= 0 || value.length < 10) {
            this.setState({
                [nameError]: ERROR_VALIDATION.BIRTHDAY.NO_VALID
            });
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.settings.companyInformation !== this.props.settings.companyInformation || nextProps.settings.sourceFunds !== this.props.settings.sourceFunds || nextProps.settings.settingsInputError !== this.props.settings.settingsInputError;
    }
    handleBlur = event => {
        const {
            value,
            id
        } = event.target;
        switch (id) {
            case 'companyCompanyName':
                this.checkEnglish(value, 'nameError', 200);
                break;
            case 'companyTaxIDnumber':
                this.checkOnlyNumber(value, 'taxIDError', 20);
                break;
            case 'companyZip':
                this.checkZip(value, 'zipError', 4, 10);
                break;
            case 'companyLinktopubliccompanyregister':
                this.checkWebURL(value, 'linkURLError', 300);
                break;
            case 'companyEmail':
                this.checkEmail(value, 100);
                break;
            case 'companyPhone':
                this.checkPhone(value, 'phoneError', 15);
                break;
            case 'companyWebsites':
                this.checkWebURL(value, 'webSiteError', 300);
                break;
        }
        const { changeSettingsCompanyInput } = this.props;
        changeSettingsCompanyInput({
            keyCompany: id,
            valueCompany: value
        });
    }
    handleFocus = event => {
        const {
            value,
            id
        } = event.target;
        this.setState({
            nameError: '',
            taxIDError: '',
            zipError: '',
            taxResidError: '',
            companyRegError: '',
            emailError: '',
            phoneError: '',
            linkURLError: '',
            webSiteError: '',
        });
        const { changeSettingsCompanyInput } = this.props;
        changeSettingsCompanyInput({
            keyCompany: id,
            valueCompany: value
        });
    }
    handleChange = event => {
        const {
            value,
            id
        } = event.target;
        const { changeSettingsCompanyInput } = this.props;
        changeSettingsCompanyInput({
            keyCompany: id,
            valueCompany: value
        });
    }

    handleDropdownCountry = (event, { value }) => {
        const { changeSettingsCompanyInput } = this.props;
        changeSettingsCompanyInput({
            keyCompany: 'companyTaxrezidencecountry',
            valueCompany: value
        });
    }

    handleDropdown = (event, { value }) => {
        const { changeSourceFunds } = this.props;
        changeSourceFunds(value);
    }


    render() {
        const {
            certifyOption,
            nameError,
            taxIDError,
            zipError,
            linkURLError,
            webSiteError,
            emailError,
            phoneError,
        } = this.state;
        const {
            settingsInputError,
            sourceFunds
        } = this.props.settings;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information header__input_text header_text_uppercase margin-top'}>
                                Information about the company
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'} >
                            <Grid.Column width={16} className={
                                (nameError.length !== 0 && this.props.settings.companyInformation.companyCompanyName.length > 0) ? "auth_input-error" : (this.props.settings.companyInformation.companyCompanyName.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCompanyName'}
                                        placeholder={'Company Name'}
                                        value={this.props.settings.companyInformation.companyCompanyName}
                                        className={this.props.settings.companyInformation.companyCompanyName ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Company Name</span>
                                    {nameError.length !== 0 && this.props.settings.companyInformation.companyCompanyName.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (taxIDError.length !== 0 && this.props.settings.companyInformation.companyTaxIDnumber.length > 0) ? "auth_input settings__information auth_input-error" : (this.props.settings.companyInformation.companyTaxIDnumber.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input settings__information auth_input-error" :  "auth_input settings__information auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyTaxIDnumber'}
                                        placeholder={'Tax ID number'}
                                        value={this.props.settings.companyInformation.companyTaxIDnumber}
                                        className={this.props.settings.companyInformation.companyTaxIDnumber ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Tax ID number</span>
                                    {taxIDError.length !== 0 && this.props.settings.companyInformation.companyTaxIDnumber.length !== 0 ? <p className={'auth__error'}>{taxIDError}</p> : null}
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input auth_input-success settings__information'}>
                                <label className={this.props.settings.companyInformation.companyTaxrezidencecountry.length === 0 ? 'auth_dropdown' : 'dropdown_populated'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        className={
                                            (this.props.settings.companyInformation.companyTaxrezidencecountry.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "dropdown-error" :  "dropdown-success"
                                        }
                                        value={this.props.settings.companyInformation.companyTaxrezidencecountry.length === 0 ? null : this.props.settings.companyInformation.companyTaxrezidencecountry}
                                        options={countryOptions}
                                        onChange={this.handleDropdownCountry}
                                    />
                                    <span className={'auth_input-dropdown'}>
                                        Tax residence country
                                </span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (this.props.settings.companyInformation.companyCity.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCity'}
                                        placeholder={'City'}
                                        value={this.props.settings.companyInformation.companyCity}
                                        className={this.props.settings.companyInformation.companyCity ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>City</span>
                                    {
                                        this.props.settings.companyInformation.companyCity.length > 90 ? <p className={this.props.settings.companyInformation.companyCity.length > 100 ? 'auth_length auth_length-red' : 'auth_length'}> {`${this.props.settings.companyInformation.companyCity.length}/100`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (zipError.length !== 0 && this.props.settings.companyInformation.companyZip.length > 0) ? "auth_input-error" : (this.props.settings.companyInformation.companyZip.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: '50%'}}>
                                    <InputMask
                                        type='text'
                                        id={'companyZip'}
                                        mask="**********"
                                        maskChar={null}
                                        placeholder={'ZIP/Postal code'}
                                        value={this.props.settings.companyInformation.companyZip}
                                        className={this.props.settings.companyInformation.companyZip ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && this.props.settings.companyInformation.companyZip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                 (this.props.settings.companyInformation.companyLegaladdress.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLegaladdress'}
                                        placeholder={'Legal address'}
                                        value={this.props.settings.companyInformation.companyLegaladdress}
                                        className={this.props.settings.companyInformation.companyLegaladdress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Legal address</span>
                                    {
                                        this.props.settings.companyInformation.companyLegaladdress.length > 1900 ? <p className={this.props.settings.companyInformation.companyLegaladdress.length > 2000 ? 'auth_length auth_length-red' : 'auth_length'}> {`${this.props.settings.companyInformation.companyLegaladdress.length}/2000`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                 (this.props.settings.companyInformation.companyActualbusinessplaceaddress.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyActualbusinessplaceaddress'}
                                        placeholder={'Actual business place address'}
                                        value={this.props.settings.companyInformation.companyActualbusinessplaceaddress}
                                        className={this.props.settings.companyInformation.companyActualbusinessplaceaddress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Actual business place address</span>
                                    {
                                        this.props.settings.companyInformation.companyActualbusinessplaceaddress.length > 1900 ? <p className={this.props.settings.companyInformation.companyActualbusinessplaceaddress.length > 2000 ? 'auth_length auth_length-red' : 'auth_length'}> {`${this.props.settings.companyInformation.companyActualbusinessplaceaddress.length}/2000`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information auth_input-success'}>
                            <Grid.Column width={16}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLinktopubliccompanyregister'}
                                        placeholder={'Link to public company register (Business Register)'}
                                        value={this.props.settings.companyInformation.companyLinktopubliccompanyregister}
                                        className={this.props.settings.companyInformation.companyLinktopubliccompanyregister ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Link to public company register (Business Register)</span>
                                    {linkURLError.length !== 0 && this.props.settings.companyInformation.companyLinktopubliccompanyregister.length !== 0 ? <p className={'auth__error'}>{linkURLError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (emailError.length !== 0 && this.props.settings.companyInformation.companyEmail.length > 0) ? "auth_input-error" : (this.props.settings.companyInformation.companyEmail.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyEmail'}
                                        placeholder={'Email'}
                                        value={this.props.settings.companyInformation.companyEmail}
                                        className={this.props.settings.companyInformation.companyEmail ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && this.props.settings.companyInformation.companyEmail.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (phoneError.length !== 0 && this.props.settings.companyInformation.companyPhone.length > 0) ? "auth_input-error" : (this.props.settings.companyInformation.companyPhone.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyPhone'}
                                        placeholder={'Phone'}
                                        value={this.props.settings.companyInformation.companyPhone}
                                        className={this.props.settings.companyInformation.companyPhone ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Phone</span>
                                    {phoneError.length !== 0 && this.props.settings.companyInformation.companyPhone.length !== 0 ? <p className={'auth__error'}>{phoneError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                (this.props.settings.companyInformation.companyDescriptioncompanydoes.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyDescriptioncompanydoes'}
                                        placeholder={'Description of what your company does'}
                                        value={this.props.settings.companyInformation.companyDescriptioncompanydoes}
                                        className={this.props.settings.companyInformation.companyDescriptioncompanydoes ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Description of what your company does</span>
                                    {
                                        this.props.settings.companyInformation.companyDescriptioncompanydoes.length > 4500 ? <p className={this.props.settings.companyInformation.companyDescriptioncompanydoes.length > 5000 ? 'auth_length auth_length-red' : 'auth_length'}> {`${this.props.settings.companyInformation.companyDescriptioncompanydoes.length}/5000`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                (webSiteError.length !== 0 && this.props.settings.companyInformation.companyWebsites.length > 0) ? "auth_input-error" : (this.props.settings.companyInformation.companyWebsites.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        id={'companyWebsites'}
                                        placeholder={'Websites'}
                                        value={this.props.settings.companyInformation.companyWebsites}
                                        className={this.props.settings.companyInformation.companyWebsites ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Websites</span>
                                    {webSiteError.length !== 0 && this.props.settings.companyInformation.companyWebsites.length !== 0 ? <p className={'auth__error'}>{webSiteError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__select'}>
                                I hereby certify that origin of funds that is available to company is legal, and its source is
                            </Grid.Column>
                            <Grid.Column width={16} className={'auth_input settings__dropdown'}>
                                <Dropdown
                                    placeholder='None' 
                                    selection
                                    className={
                                        (sourceFunds === 'None' && settingsInputError === SETTINGS.FILL_INPUT) ? "settings__dropdown-error" :  "settings__dropdown-success"
                                    }
                                    options={certifyOption}
                                    value={this.props.settings.sourceFunds}
                                    onChange={this.handleDropdown}
                                />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default connect(state => ({ settings: state.settings }), {
    changeSettingsCompanyInput,
    changeSourceFunds
})(CompanyInformation);
