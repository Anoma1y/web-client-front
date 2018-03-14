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
            ]
        }
    }

    handleChange = (event) => {
        const {
            value,
            id
        } = event.target;
        const { changeSettingsCompanyInput } = this.props;
        changeSettingsCompanyInput({keyCompany: id, valueCompany: value});
    }

    handleDropdown = (event, { value }) => {
        const { changeSourceFunds } = this.props;
        changeSourceFunds(value);
    }
    

    render() {
        const {
            certifyOption,
        } = this.state;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information header__input_text header_text_uppercase margin-top'}>
                                Information about the company
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCompanyName'}
                                        placeholder={'Company Name'}
                                        value={this.props.settings.companyInformation.companyCompanyName}
                                        className={this.props.settings.companyInformation.companyCompanyName ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Company Name</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyTaxIDnumber'}
                                        placeholder={'Tax ID number'}
                                        value={this.props.settings.companyInformation.companyTaxIDnumber}
                                        className={this.props.settings.companyInformation.companyTaxIDnumber ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Tax ID number</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyTaxrezidencecountry'}
                                        placeholder={'Tax rezidence country'}
                                        value={this.props.settings.companyInformation.companyTaxrezidencecountry}
                                        className={this.props.settings.companyInformation.companyTaxrezidencecountry ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Tax rezidence country</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyCity'}
                                        placeholder={'City'}
                                        value={this.props.settings.companyInformation.companyCity}
                                        className={this.props.settings.companyInformation.companyCity ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>City</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        id={'companyZip'}
                                        placeholder={'Zip'}
                                        value={this.props.settings.companyInformation.companyZip}
                                        className={this.props.settings.companyInformation.companyZip ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Zip</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLegaladdress'}
                                        placeholder={'Legal address'}
                                        value={this.props.settings.companyInformation.companyLegaladdress}
                                        className={this.props.settings.companyInformation.companyLegaladdress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Legal address</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyActualbusinessplaceaddress'}
                                        placeholder={'Actual business place address'}
                                        value={this.props.settings.companyInformation.companyActualbusinessplaceaddress}
                                        className={this.props.settings.companyInformation.companyActualbusinessplaceaddress ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Actual business place address</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyLinktopubliccompanyregister'}
                                        placeholder={'Link to public company register (Business Register)'}
                                        value={this.props.settings.companyInformation.companyLinktopubliccompanyregister}
                                        className={this.props.settings.companyInformation.companyLinktopubliccompanyregister ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Link to public company register (Business Register)</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyEmail'}
                                        placeholder={'EMail'}
                                        value={this.props.settings.companyInformation.companyEmail}
                                        className={this.props.settings.companyInformation.companyEmail ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>EMail</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyPhone'}
                                        placeholder={'Phone'}
                                        value={this.props.settings.companyInformation.companyPhone}
                                        className={this.props.settings.companyInformation.companyPhone ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Phone</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label>
                                    <input
                                        type='text'
                                        id={'companyDescriptioncompanydoes'}
                                        placeholder={'Description of what your company does'}
                                        value={this.props.settings.companyInformation.companyDescriptioncompanydoes}
                                        className={this.props.settings.companyInformation.companyDescriptioncompanydoes ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Description of what your company does</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={'auth_input settings__information'}>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        id={'companyWebsites'}
                                        placeholder={'Websites'}
                                        value={this.props.settings.companyInformation.companyWebsites}
                                        className={this.props.settings.companyInformation.companyWebsites ? 'populated' : ''}
                                        onChange={this.handleChange}
                                    />
                                    <span>Websites</span>
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
