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

class Beneficial extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameError: '',
            lastNameError: '',
            zipError: '',
            emailError: '',
            phoneError: ''
        }
    }

    renderUploadInfoBeneficial = () => {
        const {
            legalEntityBeneficial,
            indexBeneficial
        } = this.props;

        return legalEntityBeneficial.map((item, index) => {
            return (
                <Grid.Row key={`${item.id}_${indexBeneficial}`}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={`${item.id}_${indexBeneficial}`}
                            indexBeneficial={this.props.indexBeneficial}
                            objectFile={item.objectFile}
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
    handleDropdown = (event) => {
        const { innerText } = event.target;
        const {
            changeInputBeneficial,
            indexBeneficial
        } = this.props;
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: 'Country',
            valueBeneficial: innerText
        });
    }
    handleChange = (event) => {
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
                if (this.checkEmail(value, 'emailError' ,100) === false) {
                    return false;
                }
                break;
        }
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: id,
            valueBeneficial: value
        });
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
    checkEmail = (value, nameError, len) => {
        const pattern = /^([a-z0-9_.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (!value.match(pattern)) {
            this.setState({
                [nameError]: "Please enter a valid Email"
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
            phoneError
        } = this.state;
        return (
            <Grid.Row className={'beneficial__wrapper'}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Name'}
                                        id={'Name'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Name}
                                        className={settings.beneficial[indexBeneficial].Name ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Name</span>
                                    {nameError.length !== 0 && settings.beneficial[indexBeneficial].Name.length !== 0 ? <p className={'auth__error'}>{nameError}</p> : null}
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Surname'}
                                        id={'Surname'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Surname}
                                        className={settings.beneficial[indexBeneficial].Surname ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Surname</span>
                                    {lastNameError.length !== 0 && settings.beneficial[indexBeneficial].Surname.length !== 0 ? <p className={'auth__error'}>{lastNameError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Address'}
                                        id={'Addres'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Addres}
                                        className={settings.beneficial[indexBeneficial].Addres ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Address</span>
                                    {
                                        settings.beneficial[indexBeneficial].Addres.length > 90 ? <p className={'auth_length'}> {`${settings.beneficial[indexBeneficial].Addres.length}/100`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'City'}
                                        id={'City'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].City}
                                        className={settings.beneficial[indexBeneficial].City ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>City</span>
                                    {
                                        settings.beneficial[indexBeneficial].City.length > 90 ? <p className={'auth_length'}> {`${settings.beneficial[indexBeneficial].City.length}/100`}</p> : null
                                    }
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label className={'auth_dropdown'}>
                                    <Dropdown
                                        placeholder='Choose your country'
                                        fluid
                                        selection
                                        options={countryOptions}
                                        onChange={this.handleDropdown}
                                    />
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        placeholder={'ZIP/Postal code'}
                                        id={'Zip'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Zip}
                                        className={settings.beneficial[indexBeneficial].Zip ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>ZIP/Postal code</span>
                                    {zipError.length !== 0 && settings.beneficial[indexBeneficial].Zip.length !== 0 ? <p className={'auth__error'}>{zipError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <InputMask
                                        type='text'
                                        placeholder={'Birth day'}
                                        mask="99.99.9999"
                                        maskChar={null}
                                        id={'Dateofbirth'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Dateofbirth}
                                        className={settings.beneficial[indexBeneficial].Dateofbirth ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Birth day</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Email'}
                                        id={'Email'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Email}
                                        className={settings.beneficial[indexBeneficial].Email ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                    {emailError.length !== 0 && settings.beneficial[indexBeneficial].Email.length !== 0 ? <p className={'auth__error'}>{emailError}</p> : null}
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label >
                                    <input
                                        type='text'
                                        placeholder={'Phone'}
                                        id={'Phone'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Phone}
                                        className={settings.beneficial[indexBeneficial].Phone ? 'populated' : ''}
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

