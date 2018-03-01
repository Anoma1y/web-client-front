import React, { Component } from 'react';
import { Grid, Select, Button, Divider } from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class IndividualUser extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} className={"header__input_text header_text_uppercase"}>
                        Information about the person authorised to represent the company
                    </Grid.Column>
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


                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={"Submit a personal identity document with photo: Passport, ID, Residence document (both sides)"}
                            id={"personal_identity"}
                            key={"personal_identity"}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={"Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)"}
                            id={"document_date"}
                            key={"document_date"}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Divider />

                        <Button
                            className={"setting__button auth_btn setting__submit"}
                            fluid
                            floated={"right"}
                        >Submit
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default IndividualUser;
