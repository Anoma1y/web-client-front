import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeSettingsInput
} from 'actions/settings';
import {
    Grid,
    Dropdown
} from 'semantic-ui-react';
import { countryOptions } from 'libs/country';
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

        }
    }

    checkEnglish = (value, nameError, len) => {
        if (!value.match(/^[A-Za-z\s]+$|i/)) {
            this.setState({
                [nameError]: 'Enter only English alphabet characters'
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
                [nameError]: 'Enter numbers only'
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
                [nameError]: "Enter numbers only"
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
    checkEmail = (value, len) => {
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!value.match(pattern)) {
            this.setState({
                emailError: "Please enter a valid Email"
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
    
    handleChange = event => {
        const { value,
            id
        } = event.target;
        const {
            changeSettingsInput,
            stateObject
        } = this.props;
        switch (id) {
            case 'Name':
                if (this.checkEnglish(value, 'nameError', 100) === false) {
                    return;
                }
                break;
            case 'Surname':
                if (this.checkEnglish(value, 'lastNameError', 100) === false) {
                    return;
                }
                break;
            case 'City':
                if (value.length > 100) {
                    return;
                }
                break;
            case 'Addres':
                if (id === 'Addres' && value.length > 2000) {
                    return;
                }
                break;
            case 'Zip':
                if (this.checkOnlyNumber(value, 'zipError', 10) === false) {
                    return;
                }
                break;
            case 'Phone':
                if (this.checkPhone(value, 'phoneError', 15) === false) {
                    return;
                }
                break;
            case 'Email':
                if (this.checkEmail(value, 100) === false) {
                    return false;
                }
                break;
        }
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
            return nextProps.settings.companyUserInformation !== this.props.settings.companyUserInformation;
        } else if (stateObject === 'individualUserInformation') {
            return nextProps.settings.individualUserInformation !== this.props.settings.individualUserInformation;
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
            phoneError
        } = this.state;
        return (
            <Grid.Row className={"beneficial__wrapper"}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        id={"Name"}
                                        placeholder={"Name"}
                                        value={settings[stateObject].Name}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Name ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Name</span>
                                    {nameError.length !== 0 && settings[stateObject].Name.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        id={"Surname"}
                                        placeholder={"Surname"}
                                        value={settings[stateObject].Surname}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Surname ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Surname</span>
                                    {lastNameError.length !== 0 && settings[stateObject].Surname.length !== 0 ? <p className={'auth__error'}>{lastNameError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
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
                                        settings[stateObject].Addres.length > 1900 ? <p className={'auth_length'}> {`${settings[stateObject].Addres.length}/2000`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
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
                                        settings[stateObject].City.length > 90 ? <p className={'auth_length'}> {`${settings[stateObject].City.length}/100`}</p> : null
                                    }

                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label className={settings[stateObject].Country.length === 0 ? 'auth_dropdown' : 'dropdown_populated'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        value={settings[stateObject].Country.length === 0 ? null : settings[stateObject].Country}
                                        options={countryOptions}
                                        onChange={this.handleDropdown}
                                    />
                                    <span className={'auth_input-dropdown'}>
                                        Country
                                    </span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label style={{width: "50%"}}>
                                    <input
                                        type="text"
                                        id={"Zip"}
                                        placeholder={"ZIP/Postal code"}
                                        value={settings[stateObject].Zip}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Zip ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && settings[stateObject].Zip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <InputMask
                                        type="text"
                                        id={"Dateofbirth"}
                                        mask="99.99.9999"
                                        maskChar={null}
                                        placeholder={"Birth day"}
                                        value={settings[stateObject].Dateofbirth}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Dateofbirth ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Birth day</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="email"
                                        id={"Email"}
                                        placeholder={"Email"}
                                        value={settings[stateObject].Email}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Email ? "populated" : ""}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && settings[stateObject].Email.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label >
                                    <input
                                        type="text"
                                        id={"Phone"}
                                        placeholder={"Phone"}
                                        value={settings[stateObject].Phone}
                                        onChange={this.handleChange}
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
