import React, { Component } from 'react';
import {
    Grid
} from 'semantic-ui-react';


class PersonInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: false,
            Addres: false,
            Country: false,
            Dateofbirth: false,
            Phone: false,
            Surname: false,
            City: false,
            Zip: false,
            Email: false
        }
    }
    handleName = event => event.target.value.length > 0 ? this.setState({Name: true}) : this.setState({Name: false})
    handleAddres = event => event.target.value.length > 0 ? this.setState({Addres: true}) : this.setState({Addres: false})
    handleCountry = event => event.target.value.length > 0 ? this.setState({Country: true}) : this.setState({Country: false})
    handleDateofbirth = event => event.target.value.length > 0 ? this.setState({Dateofbirth: true}) : this.setState({Dateofbirth: false})
    handlePhone = event => event.target.value.length > 0 ? this.setState({Phone: true}) : this.setState({Phone: false})
    handleSurname = event => event.target.value.length > 0 ? this.setState({Surname: true}) : this.setState({Surname: false})
    handleCity = event => event.target.value.length > 0 ? this.setState({City: true}) : this.setState({City: false})
    handleZip = event => event.target.value.length > 0 ? this.setState({Zip: true}) : this.setState({Zip: false})
    handleEmail = event => event.target.value.length > 0 ? this.setState({Email: true}) : this.setState({Email: false})
    render() {
        return (
            <Grid.Row>

                <Grid.Column width={16} className={"header__input_text header_text_uppercase"}>
                    Information about the person authorised to represent the company
                </Grid.Column>

                <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                    <label>
                        <input
                            type="text"
                            placeholder={"Name"}
                            onChange={this.handleName}
                            className={this.state.Name ? "populated" : ""}
                        />
                        <span>Name</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"Addres"}
                            onChange={this.handleAddres}
                            className={this.state.Addres ? "populated" : ""}
                        />
                        <span>Address</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"Country"}
                            onChange={this.handleCountry}
                            className={this.state.Country ? "populated" : ""}
                        />
                        <span>Country</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"Date of birth"}
                            onChange={this.handleDateofbirth}
                            className={this.state.Dateofbirth ? "populated" : ""}
                        />
                        <span>Date of birth</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"Phone"}
                            onChange={this.handlePhone}
                            className={this.state.Phone ? "populated" : ""}
                        />
                        <span>Phone</span>
                    </label>
                </Grid.Column>

                <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                    <label>
                        <input
                            type="text"
                            placeholder={"Surname"}
                            onChange={this.handleSurname}
                            className={this.state.Surname ? "populated" : ""}
                        />
                        <span>Surname</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"City"}
                            onChange={this.handleCity}
                            className={this.state.City ? "populated" : ""}
                        />
                        <span>City</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"Zip"}
                            onChange={this.handleZip}
                            className={this.state.Zip ? "populated" : ""}
                        />
                        <span>Zip</span>
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder={"EMail"}
                            onChange={this.handleEmail}
                            className={this.state.Email ? "populated" : ""}
                        />
                        <span>EMail</span>
                    </label>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

export default PersonInformation;