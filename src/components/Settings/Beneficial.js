import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider,
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class Beneficial extends Component {

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

    handleChange = (event) => {
         const {
             value,
             id
         } = event.target;
         console.log(id, value);
         const Number = this.props.indexBeneficial;
         console.log(this.props.settings.beneficial[Number].Name);
    }

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
                                        id={"Name"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Name}
                                        className={this.props.settings.beneficial.Name ? "populated" : ""}
                                    />
                                    <span>Name</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"Surname"}
                                        id={"Surname"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Surname}
                                        className={this.props.settings.beneficial.Surname ? "populated" : ""}
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
                                        id={"Addres"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Addres}
                                        className={this.props.settings.beneficial.Addres ? "populated" : ""}
                                    />
                                    <span>Address</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"City"}
                                        id={"City"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.City}
                                        className={this.props.settings.beneficial.City ? "populated" : ""}
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
                                        id={"Country"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Country}
                                        className={this.props.settings.beneficial.Country ? "populated" : ""}
                                    />
                                    <span>Country</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label style={{width: "50%"}}>
                                    <input
                                        type="text"
                                        placeholder={"Zip"}
                                        id={"Zip"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Zip}
                                        className={this.props.settings.beneficial.Zip ? "populated" : ""}
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
                                        id={"Dateofbirth"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Dateofbirth}
                                        className={this.props.settings.beneficial.Dateofbirth ? "populated" : ""}
                                    />
                                    <span>Birth day</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type="text"
                                        placeholder={"EMail"}
                                        id={"Email"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Email}
                                        className={this.props.settings.beneficial.Email ? "populated" : ""}
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
                                        id={"Phone"}
                                        onChange={this.handleChange}
                                        value={this.props.settings.beneficial.Phone}
                                        className={this.props.settings.beneficial.Phone ? "populated" : ""}
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

