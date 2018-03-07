import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class Beneficial extends Component {
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

    renderUploadInfoBeneficial = () => {
        const { legalEntityBeneficial } = this.props;
        return legalEntityBeneficial.map((item, index) => {
            return (
                <Grid.Row key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
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

    handleName = (event) => event.target.value.length > 0 ? this.setState({Name: true}) : this.setState({Name: false})
    handleAddres = (event) => event.target.value.length > 0 ? this.setState({Addres: true}) : this.setState({Addres: false})
    handleCountry = (event) => event.target.value.length > 0 ? this.setState({Country: true}) : this.setState({Country: false})
    handleDateofbirth = (event) => event.target.value.length > 0 ? this.setState({Dateofbirth: true}) : this.setState({Dateofbirth: false})
    handlePhone = (event) => event.target.value.length > 0 ? this.setState({Phone: true}) : this.setState({Phone: false})
    handleSurname = (event) => event.target.value.length > 0 ? this.setState({Surname: true}) : this.setState({Surname: false})
    handleCity = (event) => event.target.value.length > 0 ? this.setState({City: true}) : this.setState({City: false})
    handleZip = (event) => event.target.value.length > 0 ? this.setState({Zip: true}) : this.setState({Zip: false})
    handleEmail = (event) => event.target.value.length > 0 ? this.setState({Email: true}) : this.setState({Email: false})
    render() {
        return (
            <Grid.Row className={"beneficial__wrapper"}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Name"}
                                        onChange={this.handleName}
                                        className={this.state.Name ? "populated" : ""}
                                    />
                                    <span>Name</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Surname"}
                                        onChange={this.handleSurname}
                                        className={this.state.Surname ? "populated" : ""}
                                    />
                                    <span>Surname</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Addres"}
                                        onChange={this.handleAddres}
                                        className={this.state.Addres ? "populated" : ""}
                                    />
                                    <span>Address</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"City"}
                                        onChange={this.handleCity}
                                        className={this.state.City ? "populated" : ""}
                                    />
                                    <span>City</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Country"}
                                        onChange={this.handleCountry}
                                        className={this.state.Country ? "populated" : ""}
                                    />
                                    <span>Country</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label style={{width: "50%"}}>
                                    <input
                                        type="text"
                                        placeholder={"Zip"}
                                        onChange={this.handleZip}
                                        className={this.state.Zip ? "populated" : ""}
                                    />
                                    <span>Zip</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Birth day"}
                                        onChange={this.handleDateofbirth}
                                        className={this.state.Dateofbirth ? "populated" : ""}
                                    />
                                    <span>Birth day</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
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
                        <Grid.Row className={"auth_input settings__information"}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label >
                                    <input
                                        type="text"
                                        placeholder={"Phone"}
                                        onChange={this.handlePhone}
                                        className={this.state.Phone ? "populated" : ""}
                                    />
                                    <span>Phone</span>
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

})(Beneficial);

