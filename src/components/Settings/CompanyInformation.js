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
import {LIMIT} from "libs/validation";

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
    checkEnglish = (value, nameError) => {
        if (!value.match(/^[A-Za-z\s]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.ENGLISH
            })
        } else {
            this.setState({
                [nameError]: ''
            })
        }
    }

    checkOnlyNumber = (value, nameError) => {
        if (!value.match(/^[0-9]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.NUMBER
            })
        } else {
            this.setState({
                [nameError]: ''
            })
        }
    }

    checkPhone = (value, nameError) => {
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
    }
    checkZip = (value, nameError, minLen) => {
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
    }
    checkEmail = (value, nameError) => {
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!value.match(pattern)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.EMAIL
            });
        } else {
            this.setState({
                [nameError]: ''
            })
        }
    }

    checkWebURL = (value, webError) => {
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
                this.checkEnglish(value, 'nameError');
                break;
            case 'companyTaxIDnumber':
                this.checkOnlyNumber(value, 'taxIDError');
                break;
            case 'companyZip':
                this.checkZip(value, 'zipError', 4);
                break;
            case 'companyLinktopubliccompanyregister':
                this.checkWebURL(value, 'linkURLError');
                break;
            case 'companyEmail':
                this.checkEmail(value, 'emailError');
                break;
            case 'companyPhone':
                this.checkPhone(value, 'phoneError');
                break;
            case 'companyWebsites':
                this.checkWebURL(value, 'webSiteError');
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
            sourceFunds,
            companyInformation
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
                                ((nameError.length !== 0 && companyInformation.companyCompanyName.length > 0) || companyInformation.companyCompanyName.length > LIMIT.COMPANY_NAME.MAX) ? "auth_input-error"
                                    : (companyInformation.companyCompanyName.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCompanyName'}
                                        placeholder={'Company Name'}
                                        value={companyInformation.companyCompanyName}
                                        className={companyInformation.companyCompanyName ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Company Name</span>
                                    {nameError.length !== 0 && companyInformation.companyCompanyName.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                    {companyInformation.companyCompanyName.length > LIMIT.COMPANY_NAME.ATTENTION ? <p className={companyInformation.companyCompanyName.length > LIMIT.COMPANY_NAME.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyCompanyName.length}/${LIMIT.COMPANY_NAME.MAX}`}</p> : null }

                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (taxIDError.length !== 0 && companyInformation.companyTaxIDnumber.length > 0) ? "auth_input settings__information auth_input-error" : (companyInformation.companyTaxIDnumber.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input settings__information auth_input-error" :  "auth_input settings__information auth_input-success"
                            }>
                                <label>
                                    <InputMask
                                        type='text'
                                        id={'companyTaxIDnumber'}
                                        placeholder={'Tax ID number'}
                                        mask='********************'
                                        maskChar={null}
                                        value={companyInformation.companyTaxIDnumber}
                                        className={companyInformation.companyTaxIDnumber ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Tax ID number</span>
                                    {taxIDError.length !== 0 && companyInformation.companyTaxIDnumber.length !== 0 ? <p className={'auth__error'}>{taxIDError}</p> : null}
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input auth_input-success settings__information'}>
                                <label className={companyInformation.companyTaxrezidencecountry.length === 0 ? 'auth_dropdown' : 'dropdown_populated'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        className={
                                            (companyInformation.companyTaxrezidencecountry.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "dropdown-error" :  "dropdown-success"
                                        }
                                        value={companyInformation.companyTaxrezidencecountry.length === 0 ? null : companyInformation.companyTaxrezidencecountry}
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
                                ((companyInformation.companyCity.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || companyInformation.companyCity.length > LIMIT.CITY.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCity'}
                                        placeholder={'City'}
                                        value={companyInformation.companyCity}
                                        className={companyInformation.companyCity ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>City</span>
                                    {
                                        companyInformation.companyCity.length > LIMIT.CITY.ATTENTION ? <p className={companyInformation.companyCity.length > LIMIT.CITY.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyCity.length}/${LIMIT.CITY.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (zipError.length !== 0 && companyInformation.companyZip.length > 0) ? "auth_input-error" : (companyInformation.companyZip.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: '50%'}}>
                                    <InputMask
                                        type='text'
                                        id={'companyZip'}
                                        mask="**********"
                                        maskChar={null}
                                        placeholder={'ZIP/Postal code'}
                                        value={companyInformation.companyZip}
                                        className={companyInformation.companyZip ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && companyInformation.companyZip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                 ((companyInformation.companyLegaladdress.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || companyInformation.companyLegaladdress.length > LIMIT.LEGAL_ADDRESS.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLegaladdress'}
                                        placeholder={'Legal address'}
                                        value={companyInformation.companyLegaladdress}
                                        className={companyInformation.companyLegaladdress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Legal address</span>
                                    {
                                        companyInformation.companyLegaladdress.length > LIMIT.LEGAL_ADDRESS.ATTENTION ? <p className={companyInformation.companyLegaladdress.length > LIMIT.LEGAL_ADDRESS.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyLegaladdress.length}/${LIMIT.LEGAL_ADDRESS.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                 ((companyInformation.companyActualbusinessplaceaddress.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || companyInformation.companyActualbusinessplaceaddress.length > LIMIT.ACTUAL_BUSINESS_ADDRESS.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyActualbusinessplaceaddress'}
                                        placeholder={'Actual business place address'}
                                        value={companyInformation.companyActualbusinessplaceaddress}
                                        className={companyInformation.companyActualbusinessplaceaddress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Actual business place address</span>
                                    {
                                        companyInformation.companyActualbusinessplaceaddress.length > LIMIT.ACTUAL_BUSINESS_ADDRESS.ATTENTION ? <p className={companyInformation.companyActualbusinessplaceaddress.length > LIMIT.ACTUAL_BUSINESS_ADDRESS.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyActualbusinessplaceaddress.length}/${LIMIT.ACTUAL_BUSINESS_ADDRESS.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information auth_input-success'}>
                            <Grid.Column width={16} className={
                                ((linkURLError.length !== 0 && companyInformation.companyLinktopubliccompanyregister.length > 0) || companyInformation.companyLinktopubliccompanyregister.length > LIMIT.LINK_TO_PUBLIC_COMPANY_REGISTER.MAX) ? "auth_input-error"
                                    : (companyInformation.companyLinktopubliccompanyregister.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLinktopubliccompanyregister'}
                                        placeholder={'Link to public company register (Business Register)'}
                                        value={companyInformation.companyLinktopubliccompanyregister}
                                        className={companyInformation.companyLinktopubliccompanyregister ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Link to public company register (Business Register)</span>
                                    {linkURLError.length !== 0 && companyInformation.companyLinktopubliccompanyregister.length !== 0 ? <p className={'auth__error'}>{linkURLError}</p> : null}
                                    {companyInformation.companyLinktopubliccompanyregister.length > LIMIT.LINK_TO_PUBLIC_COMPANY_REGISTER.ATTENTION ? <p className={companyInformation.companyLinktopubliccompanyregister.length > LIMIT.LINK_TO_PUBLIC_COMPANY_REGISTER.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyLinktopubliccompanyregister.length}/${LIMIT.LINK_TO_PUBLIC_COMPANY_REGISTER.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (emailError.length !== 0 && companyInformation.companyEmail.length > 0) ? "auth_input-error" : (companyInformation.companyEmail.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyEmail'}
                                        placeholder={'Email'}
                                        value={companyInformation.companyEmail}
                                        className={companyInformation.companyEmail ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && companyInformation.companyEmail.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                    {companyInformation.companyEmail.length > LIMIT.EMAIL.ATTENTION ? <p className={companyInformation.companyEmail.length > LIMIT.EMAIL.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyEmail.length}/${LIMIT.EMAIL.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={
                                (phoneError.length !== 0 && companyInformation.companyPhone.length > 0) ? "auth_input-error" : (companyInformation.companyPhone.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <InputMask
                                        type='text'
                                        id={'companyPhone'}
                                        placeholder={'Phone'}
                                        mask="***************"
                                        maskChar={null}
                                        value={companyInformation.companyPhone}
                                        className={companyInformation.companyPhone ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Phone</span>
                                    {phoneError.length !== 0 && companyInformation.companyPhone.length !== 0 ? <p className={'auth__error'}>{phoneError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                ((companyInformation.companyDescriptioncompanydoes.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || companyInformation.companyDescriptioncompanydoes.length > LIMIT.DESCRIPTION_COMPANY_DOES.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyDescriptioncompanydoes'}
                                        placeholder={'Description of what your company does'}
                                        value={companyInformation.companyDescriptioncompanydoes}
                                        className={companyInformation.companyDescriptioncompanydoes ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span className={'auth_input-span'}>Description of what your company does</span>
                                    {
                                        companyInformation.companyDescriptioncompanydoes.length > LIMIT.DESCRIPTION_COMPANY_DOES.ATTENTION ? <p className={companyInformation.companyDescriptioncompanydoes.length > LIMIT.DESCRIPTION_COMPANY_DOES.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyDescriptioncompanydoes.length}/${LIMIT.DESCRIPTION_COMPANY_DOES.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column width={16} className={
                                ((webSiteError.length !== 0 && companyInformation.companyWebsites.length > 0) || companyInformation.companyWebsites.length > LIMIT.WEBSITE.MAX) ? "auth_input-error" : (companyInformation.companyWebsites.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        id={'companyWebsites'}
                                        placeholder={'Websites'}
                                        value={companyInformation.companyWebsites}
                                        className={companyInformation.companyWebsites ? 'populated' : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                    />
                                    <span className={'auth_input-span'}>Websites</span>
                                    {webSiteError.length !== 0 && companyInformation.companyWebsites.length !== 0 ? <p className={'auth__error'}>{webSiteError}</p> : null}
                                    {companyInformation.companyWebsites.length > LIMIT.WEBSITE.ATTENTION ? <p className={companyInformation.companyWebsites.length > LIMIT.WEBSITE.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${companyInformation.companyWebsites.length}/${LIMIT.WEBSITE.MAX}`}</p> : null }
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
                                        ((sourceFunds === 'None' && settingsInputError === SETTINGS.FILL_INPUT) || (sourceFunds === '' && settingsInputError === SETTINGS.FILL_INPUT)) ? "settings__dropdown-error" :  "settings__dropdown-success"
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
