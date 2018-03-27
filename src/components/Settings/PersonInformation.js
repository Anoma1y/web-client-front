import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeSettingsInput,
} from 'actions/settings';
import {
    Grid,
    Dropdown
} from 'semantic-ui-react';
import { countryOptions } from 'libs/country';
import {
    ERROR_VALIDATION,
    SETTINGS
} from 'libs/messages';
import { LIMIT } from 'libs/validation';
import InputMask from 'react-input-mask';

class PersonInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameError: '',
            lastNameError: '',
            emailError: '',
            zipError: '',
            phoneError: '',
            birthdayError: ''
        }
    }

    checkEnglish = (value, nameError) => {
        if (!value.match(/^[A-Za-z\s]+$|i/)) {
            this.setState({
                [nameError]: ERROR_VALIDATION.ENGLISH
            });
        } else {
            this.setState({
                [nameError]: ''
            });
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
            });
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
        }
        else {
            this.setState({
                [nameError]: ''
            });
        }
    }
    handleFocus = event => {
        const {
            value,
            id
        } = event.target;
        switch (id) {
            case 'Name':
                this.setState({
                    nameError: ''
                });
                break;
            case 'Surname':
                this.setState({
                    lastNameError: ''
                });
                break;
            case 'Zip':
                this.setState({
                    zipError: ''
                });
                break;
            case 'Phone':
                this.setState({
                    phoneError: ''
                });
                break;
            case 'Email':
                this.setState({
                    emailError: ''
                });
                break;
            case 'Dateofbirth':
                this.setState({
                    birthdayError: ''
                });
                break;
        };
        const {
            changeSettingsInput,
            stateObject
        } = this.props;
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: id,
            valueInput: value
        });
    }
    handleBlur = event => {
        const {
            value,
            id
        } = event.target;
        const {
            changeSettingsInput,
            stateObject
        } = this.props;
        switch (id) {
            case 'Name':
                this.checkEnglish(value, 'nameError');
                break;
            case 'Surname':
                this.checkEnglish(value, 'lastNameError');
                break;
            case 'Zip':
                this.checkZip(value, 'zipError',4);
                break;
            case 'Phone':
                this.checkPhone(value, 'phoneError');
                break;
            case 'Email':
                this.checkEmail(value, 'emailError');
                break;
            case 'Dateofbirth':
                this.checkAge(value, 'birthdayError');
                break;
        };
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: id,
            valueInput: value
        });
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
            if (days < 6574 && days > 0) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.UNDER
                });
            } else if (days > 36159) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.OVER
                });
            } else if (Math.sign(days) === -1
                || Number(DATE.DAY) > 31
                || Number(DATE.MONTH) > 12
                || Number(DATE.MONTH) === 0
                || Number(DATE.DAY) === 0
                || Number(DATE.YEAR) === 0) {

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
    
    handleChange = event => {
        const { value,
            id
        } = event.target;
        const {
            changeSettingsInput,
            stateObject,
        } = this.props;
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: id,
            valueInput: value
        });
    }

    handleDropdown = (event, { value }) => {
        const {
            changeSettingsInput,
            stateObject
        } = this.props;
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: 'Country',
            valueInput: value
        });
    }

    shouldComponentUpdate(nextProps) {
        const {
            stateObject
        } = this.props;
        if (stateObject === 'companyUserInformation') {
            return nextProps.settings.companyUserInformation !== this.props.settings.companyUserInformation || nextProps.settings.settingsInputError !== this.props.settings.settingsInputError;
        } else if (stateObject === 'individualUserInformation') {
            return nextProps.settings.individualUserInformation !== this.props.settings.individualUserInformation || nextProps.settings.settingsInputError !== this.props.settings.settingsInputError;
        } 
    }

    render() {
        const {
            settings,
            stateObject
        } = this.props;
        const {
            nameError,
            lastNameError,
            emailError,
            zipError,
            phoneError,
            birthdayError
        } = this.state;
        const { settingsInputError } = this.props.settings;
        return (
            <Grid.Row className={"beneficial__wrapper"}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={'auth_input settings__information'}>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((nameError.length !== 0 && settings[stateObject].Name.length > 0) || settings[stateObject].Name.length > LIMIT.NAME.MAX) ? "auth_input-error"
                                    : (settings[stateObject].Name.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"Name"}
                                        placeholder={"Name"}
                                        value={settings[stateObject].Name}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Name ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Name</span>
                                    {nameError.length !== 0 && settings[stateObject].Name.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                    {settings[stateObject].Name.length > LIMIT.NAME.ATTENTION ? <p className={settings[stateObject].Name.length > LIMIT.NAME.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings[stateObject].Name.length}/${LIMIT.NAME.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>


                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((lastNameError.length !== 0 && settings[stateObject].Surname.length > 0) || settings[stateObject].Surname.length > LIMIT.SURNAME.MAX) ? "auth_input-error"
                                    : (settings[stateObject].Surname.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }
                            >
                                <label>
                                    <input
                                        type="text"
                                        id={"Surname"}
                                        placeholder={"Surname"}
                                        value={settings[stateObject].Surname}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Surname ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Surname</span>
                                    {lastNameError.length !== 0 && settings[stateObject].Surname.length !== 0 ? <p className={'auth__error'}>{lastNameError}</p> : null}
                                    {settings[stateObject].Surname.length > LIMIT.SURNAME.ATTENTION ? <p className={settings[stateObject].Surname.length > LIMIT.SURNAME.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings[stateObject].Surname.length}/${LIMIT.SURNAME.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((settings[stateObject].Addres.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || settings[stateObject].Addres.length > LIMIT.ADDRESS.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"Addres"}
                                        placeholder={"Address"}
                                        value={settings[stateObject].Addres}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Addres ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Address</span>
                                    {
                                        settings[stateObject].Addres.length > LIMIT.ADDRESS.ATTENTION ? <p className={settings[stateObject].Addres.length > LIMIT.ADDRESS.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings[stateObject].Addres.length}/${LIMIT.ADDRESS.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((settings[stateObject].City.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || settings[stateObject].City.length > LIMIT.CITY.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"City"}
                                        placeholder={"City"}
                                        value={settings[stateObject].City}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].City ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>
                                        City
                                    </span>
                                    {
                                        settings[stateObject].City.length > LIMIT.CITY.ATTENTION ? <p className={settings[stateObject].City.length > LIMIT.CITY.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings[stateObject].City.length}/${LIMIT.CITY.MAX}`}</p> : null
                                    }

                                </label>
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (settings[stateObject].Country.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label className={settings[stateObject].Country.length === 0 ? 'auth_dropdown' : 'dropdown_populated'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        className={
                                            (settings[stateObject].Country.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "dropdown-error" :  "dropdown-success"
                                        }
                                        value={settings[stateObject].Country.length === 0 ? null : settings[stateObject].Country}
                                        options={countryOptions}
                                        onChange={this.handleDropdown}
                                    />
                                    <span className={'auth_input-dropdown'}>
                                        Country
                                    </span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (zipError.length !== 0 && settings[stateObject].Zip.length > 0) ? "auth_input-error" : (settings[stateObject].Zip.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: "50%"}}>
                                    <InputMask
                                        type="text"
                                        id={"Zip"}
                                        mask="**********"
                                        maskChar={null}
                                        placeholder={"ZIP/Postal code"}
                                        value={settings[stateObject].Zip}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Zip ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && settings[stateObject].Zip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (birthdayError.length !== 0 && settings[stateObject].Dateofbirth.length > 0) ? "auth_input-error"
                                    : (settings[stateObject].Dateofbirth.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                        :  "auth_input-success"

                            }>
                                <label>
                                    <InputMask
                                        type="text"
                                        id={"Dateofbirth"}
                                        mask="99.99.9999"
                                        maskChar={null}
                                        placeholder={"Birth day"}
                                        value={settings[stateObject].Dateofbirth}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Dateofbirth ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Birth day</span>
                                    {birthdayError.length !== 0 && settings[stateObject].Dateofbirth.length !== 0 ? <p className={'auth__error'}>{birthdayError}</p> : null}
                                </label>
                            </Grid.Column>
                            
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((emailError.length !== 0 && settings[stateObject].Email.length > 0) || settings[stateObject].Email.length > LIMIT.EMAIL.MAX) ? "auth_input-error"
                                    : (settings[stateObject].Email.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    : (emailError.length === 0  && settings[stateObject].Email.length > LIMIT.EMAIL.MAX) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="email"
                                        id={"Email"}
                                        placeholder={"Email"}
                                        value={settings[stateObject].Email}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Email ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && settings[stateObject].Email.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                    {settings[stateObject].Email.length > LIMIT.EMAIL.ATTENTION ? <p className={settings[stateObject].Email.length > LIMIT.EMAIL.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings[stateObject].Email.length}/${LIMIT.EMAIL.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                            
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (phoneError.length !== 0 && settings[stateObject].Phone.length > 0) ? "auth_input-error" : (settings[stateObject].Phone.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label >
                                    <InputMask
                                        type="text"
                                        id={"Phone"}
                                        placeholder={"Phone"}
                                        mask="***************"
                                        maskChar={null}
                                        value={settings[stateObject].Phone}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings[stateObject].Phone ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Phone</span>
                                    {phoneError.length !== 0 && settings[stateObject].Phone.length !== 0 ? <p className={'auth__error'}>{phoneError}</p> : null}
                                </label>
                            </Grid.Column>
                            
                        </Grid.Row>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default connect(state => ({ settings: state.settings }), {
    changeSettingsInput
})(PersonInformation);
