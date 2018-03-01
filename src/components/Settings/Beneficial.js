import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
class Beneficial extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                        <label>
                            <input
                                type="text"
                                placeholder={"Name"}
                            />
                            <span>Name</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"Addres"}
                            />
                            <span>Addres</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"Country"}
                            />
                            <span>Country</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"Date of birth"}
                            />
                            <span>Date of birth</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"Phone"}
                            />
                            <span>Phone</span>
                        </label>
                    </Grid.Column>
                    <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                        <label>
                            <input
                                type="text"
                                placeholder={"Surname"}
                            />
                            <span>Surname</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"City"}
                            />
                            <span>City</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"Zip"}
                            />
                            <span>Zip</span>
                        </label>
                        <label>
                            <input
                                type="text"
                                placeholder={"E-mail"}
                            />
                            <span>E-mail</span>
                        </label>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default Beneficial;
