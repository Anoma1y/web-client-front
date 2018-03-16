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
            phoneError: ''
        }
    }

    checkEnglish = (value, nameError, len) => {
        if (!value.match(/^[A-Za-z]+$|i/)) {
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

        if (id === 'Name') {
            if (this.checkEnglish(value, 'nameError', 100) === false) {
                return;
            }
        } else if (id === 'Surname') {
            if (this.checkEnglish(value, 'lastNameError', 100) === false) {
                return;
            }
        } else if (id === 'City' && value.length > 100) {
            return;
        } else if (id === 'Addres' && value.length > 2000) {
            return;
        } else if (id === 'Zip') {
            if (this.checkOnlyNumber(value, 'zipError', 10) === false) {
                return;
            }
        } else if (id === 'Phone') {
            if (this.checkOnlyNumber(value, 'phoneError', 100) === false) {
                return;
            }
        } else if (id === 'Email') {
            if (this.checkEmail(value, 100) === false) {
                return false;
            }
        }
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: id,
            valueInput: value
        });
    }

    handleDropdown = event => {
        const { innerText } = event.target;
        const {
            changeSettingsInput,
            stateObject
        } = this.props;
        changeSettingsInput({
            stateInput: stateObject,
            keyInput: 'Country',
            valueInput: innerText
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
            birthdayError,
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
                                    <span>Name</span>
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
                                    <span>Surname</span>
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
                                    <span>Address</span>
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
                                    <span>
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
                                <label className={'auth_dropdown'}>
                                    <Dropdown
                                        placeholder='Country'
                                        search
                                        selection
                                        options={countryOptions}
                                        onChange={this.handleDropdown}
                                    />
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
                                    <span>ZIP/Postal code</span>
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
                                        mask="99 99 9999"
                                        maskChar={null}
                                        placeholder={"Birth day"}
                                        value={settings[stateObject].Dateofbirth}
                                        onChange={this.handleChange}
                                        className={settings[stateObject].Dateofbirth ? "populated" : ""}
                                    />
                                    <span>Birth day</span>
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
                                    <span>Email</span>
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
                                    <span>Phone</span>
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
