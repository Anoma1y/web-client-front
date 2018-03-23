import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider,
    Dropdown
} from 'semantic-ui-react';
import { changeInputBeneficial } from 'actions/settings';
import IdentificationImgUpload from './IdentificationImgUpload';
import {countryOptions} from "libs/country";
import InputMask from 'react-input-mask';
import {ERROR_VALIDATION, SETTINGS} from 'libs/messages';
import {LIMIT} from "libs/validation";

class Beneficial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameError: '',
            lastNameError: '',
            zipError: '',
            emailError: '',
            phoneError: '',
            birthdayError: ''
        }
    }

    renderUploadInfoBeneficial = () => {
        const {
            legalEntityBeneficial,
            indexBeneficial
        } = this.props;
        const {
            beneficialImage
        } = this.props.settings;
        return legalEntityBeneficial.map((item, index) => {
            return (
                <Grid.Row key={`${item.ID}_${indexBeneficial}`}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.DESCRIPTION}
                            id={`${item.ID}_${indexBeneficial}`}
                            indexBeneficial={this.props.indexBeneficial}
                            objectFile={item.OBJECT_FILE}
                            imageValue={
                                beneficialImage[indexBeneficial] !== undefined ? beneficialImage[indexBeneficial][item.ID] : ''
                            }
                        />
                    </Grid.Column>
                    { index !== (legalEntityBeneficial.length - 1) ?
                        <Grid.Column width={16}>
                            <Divider/>
                        </Grid.Column>
                        : null
                    }
                </Grid.Row>
            )
        })
    }
    handleDropdown = (event, { value }) => {
        const {
            changeInputBeneficial,
            indexBeneficial
        } = this.props;
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: 'Country',
            valueBeneficial: value
        });
    }
    handleBlur = event => {
        const {
            value,
            id
        } = event.target;
        const {
            indexBeneficial,
            changeInputBeneficial
        } = this.props;
        switch (id) {
            case 'Name':
                this.checkEnglish(value, 'nameError', 100);
                break;
            case 'Surname':
                this.checkEnglish(value, 'lastNameError', 100);
                break;
            case 'Zip':
                this.checkZip(value, 'zipError', 4, 10);
                break;
            case 'Phone':
                this.checkPhone(value, 'phoneError', 15);
                break;
            case 'Email':
                this.checkEmail(value, 'emailError' ,100);
                break;
            case 'Dateofbirth':
                this.checkAge(value, 'birthdayError');
                break;
        }
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: id,
            valueBeneficial: value
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
            if (days < 6570 && days > 0) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.UNDER
                });
            } else if (days > 36200) {
                this.setState({
                    [nameError]: ERROR_VALIDATION.BIRTHDAY.OVER
                });
            } else if (Math.sign(days) === -1 || Number(DATE.DAY) > 31 || Number(DATE.MONTH) > 12 ) {
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
            indexBeneficial,
            changeInputBeneficial
        } = this.props;
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: id,
            valueBeneficial: value
        });
    }
    handleChange = event => {
        const {
            value,
            id
        } = event.target;
        const {
            indexBeneficial,
            changeInputBeneficial
        } = this.props;
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: id,
            valueBeneficial: value
        });
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
    checkEmail = (value, nameError, len) => {
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
        if (value.length > len) {
            return false;
        }
    }
    render() {
        const {
            settings,
            indexBeneficial
        } = this.props;
        const {
            nameError,
            lastNameError,
            zipError,
            emailError,
            phoneError,
            birthdayError
        } = this.state;
        const { settingsInputError } = this.props.settings;
        return (
            <Grid.Row className={'beneficial__wrapper'}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((nameError.length !== 0 && settings.beneficial[indexBeneficial].Name.length > 0) || settings.beneficial[indexBeneficial].Name.length > LIMIT.NAME.MAX) ? "auth_input-error"
                                    : (settings.beneficial[indexBeneficial].Name.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"Name"}
                                        placeholder={"Name"}
                                        value={settings.beneficial[indexBeneficial].Name}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Name ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Name</span>
                                    {nameError.length !== 0 && settings.beneficial[indexBeneficial].Name.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                    {settings.beneficial[indexBeneficial].Name.length > LIMIT.NAME.ATTENTION ? <p className={settings.beneficial[indexBeneficial].Name.length > LIMIT.NAME.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings.beneficial[indexBeneficial].Name.length}/${LIMIT.NAME.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((lastNameError.length !== 0 && settings.beneficial[indexBeneficial].Surname.length > 0) || settings.beneficial[indexBeneficial].Surname.length > LIMIT.SURNAME.MAX) ? "auth_input-error"
                                    : (settings.beneficial[indexBeneficial].Surname.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"
                            }
                            >
                                <label>
                                    <input
                                        type="text"
                                        id={"Surname"}
                                        placeholder={"Surname"}
                                        value={settings.beneficial[indexBeneficial].Surname}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Surname ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Surname</span>
                                    {lastNameError.length !== 0 && settings.beneficial[indexBeneficial].Surname.length !== 0 ? <p className={'auth__error'}>{lastNameError}</p> : null}
                                    {settings.beneficial[indexBeneficial].Surname.length > LIMIT.SURNAME.ATTENTION ? <p className={settings.beneficial[indexBeneficial].Surname.length > LIMIT.SURNAME.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings.beneficial[indexBeneficial].Surname.length}/${LIMIT.SURNAME.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((settings.beneficial[indexBeneficial].Addres.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || settings.beneficial[indexBeneficial].Addres.length > LIMIT.ADDRESS.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"Addres"}
                                        placeholder={"Address"}
                                        value={settings.beneficial[indexBeneficial].Addres}
                                        onChange={this.handleChange}
                                        className={settings.beneficial[indexBeneficial].Addres ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Address</span>
                                    {
                                        settings.beneficial[indexBeneficial].Addres.length > LIMIT.ADDRESS.ATTENTION ? <p className={settings.beneficial[indexBeneficial].Addres.length > LIMIT.ADDRESS.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings.beneficial[indexBeneficial].Addres.length}/${LIMIT.ADDRESS.MAX}`}</p> : null
                                    }
                                </label>
                            </Grid.Column>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((settings.beneficial[indexBeneficial].City.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) || settings.beneficial[indexBeneficial].City.length > LIMIT.CITY.MAX ) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="text"
                                        id={"City"}
                                        placeholder={"City"}
                                        value={settings.beneficial[indexBeneficial].City}
                                        onChange={this.handleChange}
                                        className={settings.beneficial[indexBeneficial].City ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>
                                        City
                                    </span>
                                    {
                                        settings.beneficial[indexBeneficial].City.length > LIMIT.CITY.ATTENTION ? <p className={settings.beneficial[indexBeneficial].City.length > LIMIT.CITY.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings.beneficial[indexBeneficial].City.length}/${LIMIT.CITY.MAX}`}</p> : null
                                    }

                                </label>
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (settings.beneficial[indexBeneficial].Country.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label className={settings.beneficial[indexBeneficial].Country.length === 0 ? 'auth_dropdown' : 'dropdown_populated'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        className={
                                            (settings.beneficial[indexBeneficial].Country.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "dropdown-error" :  "dropdown-success"
                                        }
                                        value={settings.beneficial[indexBeneficial].Country.length === 0 ? null : settings.beneficial[indexBeneficial].Country}
                                        options={countryOptions}
                                        onChange={this.handleDropdown}
                                    />
                                    <span className={'auth_input-dropdown'}>
                                        Country
                                    </span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (zipError.length !== 0 && settings.beneficial[indexBeneficial].Zip.length > 0) ? "auth_input-error" : (settings.beneficial[indexBeneficial].Zip.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label style={{width: "50%"}}>
                                    <InputMask
                                        type="text"
                                        id={"Zip"}
                                        mask="**********"
                                        maskChar={null}
                                        placeholder={"ZIP/Postal code"}
                                        value={settings.beneficial[indexBeneficial].Zip}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Zip ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && settings.beneficial[indexBeneficial].Zip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (birthdayError.length !== 0 && settings.beneficial[indexBeneficial].Dateofbirth.length > 0) ? "auth_input-error"
                                    : (settings.beneficial[indexBeneficial].Dateofbirth.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    :  "auth_input-success"

                            }>
                                <label>
                                    <InputMask
                                        type="text"
                                        id={"Dateofbirth"}
                                        mask="99.99.9999"
                                        maskChar={null}
                                        placeholder={"Birth day"}
                                        value={settings.beneficial[indexBeneficial].Dateofbirth}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Dateofbirth ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Birth day</span>
                                    {birthdayError.length !== 0 && settings.beneficial[indexBeneficial].Dateofbirth.length !== 0 ? <p className={'auth__error'}>{birthdayError}</p> : null}
                                </label>
                            </Grid.Column>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                ((emailError.length !== 0 && settings.beneficial[indexBeneficial].Email.length > 0) || settings.beneficial[indexBeneficial].Email > LIMIT.EMAIL.MAX)? "auth_input-error"
                                    : (settings.beneficial[indexBeneficial].Email.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error"
                                    : (emailError.length === 0  && settings.beneficial[indexBeneficial].Email.length > LIMIT.EMAIL.MAX) ? "auth_input-error"
                                    :  "auth_input-success"
                            }>
                                <label>
                                    <input
                                        type="email"
                                        id={"Email"}
                                        placeholder={"Email"}
                                        value={settings.beneficial[indexBeneficial].Email}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Email ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && settings.beneficial[indexBeneficial].Email.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                    {settings.beneficial[indexBeneficial].Email.length > LIMIT.EMAIL.ATTENTION ? <p className={settings.beneficial[indexBeneficial].Email.length > LIMIT.EMAIL.MAX ? 'auth_length auth_length-red' : 'auth_length'}> {`${settings.beneficial[indexBeneficial].Email.length}/${LIMIT.EMAIL.MAX}`}</p> : null }
                                </label>
                            </Grid.Column>

                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>

                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16} className={
                                (phoneError.length !== 0 && settings.beneficial[indexBeneficial].Phone.length > 0) ? "auth_input-error" : (settings.beneficial[indexBeneficial].Phone.length === 0 && settingsInputError === SETTINGS.FILL_INPUT) ? "auth_input-error" :  "auth_input-success"
                            }>
                                <label >
                                    <InputMask
                                        type="text"
                                        id={"Phone"}
                                        placeholder={"Phone"}
                                        mask="***************"
                                        maskChar={null}
                                        value={settings.beneficial[indexBeneficial].Phone}
                                        onChange={this.handleChange}
                                        onBlur={this.handleBlur}
                                        onFocus={this.handleFocus}
                                        className={settings.beneficial[indexBeneficial].Phone ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Phone</span>
                                    {phoneError.length !== 0 && settings.beneficial[indexBeneficial].Phone.length !== 0 ? <p className={'auth__error'}>{phoneError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        {this.renderUploadInfoBeneficial()}
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {
    changeInputBeneficial
})(Beneficial);

