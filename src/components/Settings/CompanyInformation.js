import React, { Component } from 'react';
import {
    Grid,
    Select,
    Dropdown
} from 'semantic-ui-react';


class CompanyInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyCompanyName: false,
            companyTaxIDnumber: false,
            companyTaxrezidencecountry: false,
            companyCity: false,
            companyZip: false,
            companyLegaladdress: false,
            companyActualbusinessplaceaddress: false,
            companyLinktopubliccompanyregister: false,
            companyEmail: false,
            companyPhone: false,
            companyDescriptioncompanydoes: false,
            companyWebsites: false,
            certifyOption: [
                {key: "0", value: "0", text: "None"},
                {key: "1", value: "1", text: "Proceeds from commercial activity"},
                {key: "2", value: "2", text: "Credit funds"},
                {key: "3", value: "3", text: "Company profits"},
                {key: "4", value: "4", text: "Sale of property"},
                {key: "5", value: "5", text: "Proceeds from the sale of securities, investment activities"},
                {key: "6", value: "6", text: "Other - specify"}
            ]
        }
    }

    handleCompanyCompanyName = (event) => event.target.value.length > 0 ? this.setState({companyCompanyName: true}) : this.setState({companyCompanyName: false})
    handleCompanyTaxIDnumber = (event) => event.target.value.length > 0 ? this.setState({companyTaxIDnumber: true}) : this.setState({companyTaxIDnumber: false})
    handleCompanyTaxrezidencecountry = (event) => event.target.value.length > 0 ? this.setState({companyTaxrezidencecountry: true}) : this.setState({companyTaxrezidencecountry: false})
    handleCompanyCity = (event) => event.target.value.length > 0 ? this.setState({companyCity: true}) : this.setState({companyCity: false})
    handleCompanyZip = (event) => event.target.value.length > 0 ? this.setState({companyZip: true}) : this.setState({companyZip: false})
    handleCompanyLegaladdress = (event) => event.target.value.length > 0 ? this.setState({companyLegaladdress: true}) : this.setState({companyLegaladdress: false})
    handleCompanyActualbusinessplaceaddress = (event) => event.target.value.length > 0 ? this.setState({companyActualbusinessplaceaddress: true}) : this.setState({companyActualbusinessplaceaddress: false})
    handleCompanyLinktopubliccompanyregister = (event) => event.target.value.length > 0 ? this.setState({companyLinktopubliccompanyregister: true}) : this.setState({companyLinktopubliccompanyregister: false})
    handleCompanyEmail = (event) => event.target.value.length > 0 ? this.setState({companyEmail: true}) : this.setState({companyEmail: false})
    handleCompanyPhone = (event) => event.target.value.length > 0 ? this.setState({companyPhone: true}) : this.setState({companyPhone: false})
    handleCompanyDescriptioncompanydoes = (event) => event.target.value.length > 0 ? this.setState({companyDescriptioncompanydoes: true}) : this.setState({companyDescriptioncompanydoes: false})
    handleCompanyWebsites = (event) => event.target.value.length > 0 ? this.setState({companyWebsites: true}) : this.setState({companyWebsites: false})

    render() {
        const { certifyOption } = this.state;
        return (
            <Grid.Row>
                <Grid.Column>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input header__input_text header_text_uppercase"}>
                                Information about the company
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Company Name"}
                                        className={this.state.companyCompanyName ? "populated" : ""}
                                        onChange={this.handleCompanyCompanyName}
                                    />
                                    <span>Company Name</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Tax ID number"}
                                        className={this.state.companyTaxIDnumber ? "populated" : ""}
                                        onChange={this.handleCompanyTaxIDnumber}
                                    />
                                    <span>Tax ID number</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Tax rezidence country"}
                                        className={this.state.companyTaxrezidencecountry ? "populated" : ""}
                                        onChange={this.handleCompanyTaxrezidencecountry}
                                    />
                                    <span>Tax rezidence country</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"City"}
                                        className={this.state.companyCity ? "populated" : ""}
                                        onChange={this.handleCompanyCity}
                                    />
                                    <span>City</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label style={{width: "50%"}}>
                                    <input
                                        type="text"
                                        placeholder={"Zip"}
                                        className={this.state.companyZip ? "populated" : ""}
                                        onChange={this.handleCompanyZip}
                                    />
                                    <span>Zip</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Legal address"}
                                        className={this.state.companyLegaladdress ? "populated" : ""}
                                        onChange={this.handleCompanyLegaladdress}
                                    />
                                    <span>Legal address</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Actual business place address"}
                                        className={this.state.companyActualbusinessplaceaddress ? "populated" : ""}
                                        onChange={this.handleCompanyActualbusinessplaceaddress}
                                    />
                                    <span>Actual business place address</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Link to public company register (Business Register)"}
                                        className={this.state.companyLinktopubliccompanyregister ? "populated" : ""}
                                        onChange={this.handleCompanyLinktopubliccompanyregister}
                                    />
                                    <span>Link to public company register (Business Register)</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"EMail"}
                                        className={this.state.companyEmail ? "populated" : ""}
                                        onChange={this.handleCompanyEmail}
                                    />
                                    <span>EMail</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Phone"}
                                        className={this.state.companyPhone ? "populated" : ""}
                                        onChange={this.handleCompanyPhone}
                                    />
                                    <span>Phone</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Description of what your company does"}
                                        className={this.state.companyDescriptioncompanydoes ? "populated" : ""}
                                        onChange={this.handleCompanyDescriptioncompanydoes}
                                    />
                                    <span>Description of what your company does</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input"}>
                                <label style={{width: "50%"}}>
                                    <input
                                        type="text"
                                        placeholder={"Websites"}
                                        className={this.state.companyWebsites ? "populated" : ""}
                                        onChange={this.handleCompanyWebsites}
                                    />
                                    <span>Websites</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={16} className={"auth_input settings__select"}>
                                I hereby certify that origin of funds that is available to company is legal, and its source is
                            </Grid.Column>
                            <Grid.Column width={16} className={"auth_input settings__dropdown"}>
                                <Dropdown placeholder='None' selection options={certifyOption} />
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default CompanyInformation;