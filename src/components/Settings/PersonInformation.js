import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    changeSettingsInput
} from 'actions/settings';
import {
    Grid
} from 'semantic-ui-react';

class PersonInformation extends Component {

    handleChange = event => {
        const { value, id } = event.target;
        const { changeSettingsInput, stateObject } = this.props;
        changeSettingsInput({stateInput: stateObject ,keyInput: id, valueInput: value });
    }

    render() {
        const {
            settings,
            stateObject
        } = this.props;
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
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"auth_input settings__information"}>
                                <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                    <label>
                                        <input
                                            type="text"
                                            id={"Addres"}
                                            placeholder={"Addres"}
                                            value={settings[stateObject].Addres}
                                            onChange={this.handleChange}
                                            className={settings[stateObject].Addres ? "populated" : ""}
                                        />
                                        <span>Address</span>
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
                                        <span>City</span>
                                    </label>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className={"auth_input settings__information"}>
                                <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                    <label>
                                        <input
                                            type="text"
                                            id={"Country"}
                                            placeholder={"Country"}
                                            value={settings[stateObject].Country}
                                            onChange={this.handleChange}
                                            className={settings[stateObject].Country ? "populated" : ""}
                                        />
                                        <span>Country</span>
                                    </label>
                                </Grid.Column>
                                <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                    <label style={{width: "50%"}}>
                                        <input
                                            type="text"
                                            id={"Zip"}
                                            placeholder={"Zip"}
                                            value={settings[stateObject].Zip}
                                            onChange={this.handleChange}
                                            className={settings[stateObject].Zip ? "populated" : ""}
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
                                            id={"Dateofbirth"}
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
                                            placeholder={"EMail"}
                                            value={settings[stateObject].Email}
                                            onChange={this.handleChange}
                                            className={settings[stateObject].Email ? "populated" : ""}
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
                                            id={"Phone"}
                                            placeholder={"Phone"}
                                            value={settings[stateObject].Phone}
                                            onChange={this.handleChange}
                                            className={settings[stateObject].Phone ? "populated" : ""}
                                        />
                                        <span>Phone</span>
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
