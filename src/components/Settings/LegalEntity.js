import React, { Component } from 'react';
import { Grid, Select, Button, Divider } from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class LegalEntity extends Component {
    render() {
        const certifyOption = [
            {key: "1", value: "1", text: "Proceeds from commercial activity"},
            {key: "2", value: "2", text: "Credit funds"},
            {key: "3", value: "3", text: "Company profits"},
            {key: "4", value: "4", text: "Sale of property"},
            {key: "5", value: "5", text: "Proceeds from the sale of securities, investment activities"},
            {key: "6", value: "6", text: "Other - specify"}
        ]
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

                <Divider className={"blue__divider"}/>
                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={"Submit a director’s personal identity document: One of the following Passport, ID, Residence Document (both sides)"}
                            id={"director_personal"}
                            key={"director_personal"}
                        />

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={"Basis of representation (statute, letter of attorney, etc.)"}
                            id={"basis_representation"}
                            key={"basis_representation"}
                        />
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={"If the company register of the country does not provide public data: Certificate of actual status. Upload a Certificate of actual status The certificate of actual status should be issued by the official Company register or a similar authorized institution in the country of registration of your company: the Certificate of actual status should contain: the company name, address, seat, registration number/ tax number or similar, Legal representatives (Managers) names, business activity. The document should be issued no more than 6 months before the date of upload. A document confirming the right to represent the company"}
                            id={"company_register_country"}
                            key={"company_register_country"}
                        />

                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={" A document confirming the right to represent the company"}
                            id={"document_represent_company"}
                            key={"document_represent_company"}
                        />

                    </Grid.Column>

                </Grid.Row>
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
                                        />
                                        <span>Tax ID number</span>
                                    </label>
                                </Grid.Column>
                                <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder={"Tax rezidence country"}
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
                                        />
                                        <span>City</span>
                                    </label>
                                </Grid.Column>
                                <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder={"Zip"}
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
                                            placeholder={"E-mail"}
                                        />
                                        <span>E-mail</span>
                                    </label>
                                </Grid.Column>
                                <Grid.Column widecreen={8} computer={8} tablet={8} mobile={16} className={"auth_input"}>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder={"Phone"}
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
                                        />
                                        <span>Description of what your company does</span>
                                    </label>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={16} className={"auth_input"}>
                                    <label>
                                        <input
                                            type="text"
                                            placeholder={"Websites"}
                                        />
                                        <span>Websites</span>
                                    </label>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column width={16} className={"auth_input header__input_text header_text_uppercase"}>
                                    I hereby certify that origin of funds that is available to company is legal, and its source is
                                </Grid.Column>
                                <Grid.Column width={16} className={"auth_input"}>
                                    <Select style={{width: "100%"}} options={certifyOption}/>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"Upload a Business registration document. Please upload a copy of ONE of the following types documents: a business registration; a bank statement (2 weeks old), a credit card statement, a utility bill, an insurance contract, a receipt for paid insurance, an invoice, or any other type of contract or document, which contains the company address, BULSTAT, VAT, Tax number"}
                            id={"business_registration_document"}
                            key={"business_registration_document"}
                        />

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"The document should be no older than 3 months by the date of upload.)"}
                            id={"document_older_3"}
                            key={"document_older_3"}
                        />

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"Upload Business activity license requirement. If your business activity is subject to licensing and regulation by an independent authority (for instance, such business activities are: insurance, gambling (casinos, online casinos, other gaming activities), investment brokerage, advisory asset management, financial services, pharmaceutical products trade, precious metals trade, securities trade, etc.), please upload a copy of your company license or permit."}
                            id={"business_activity_license"}
                            key={"business_activity_license"}
                        />

                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"If your business activity doesn’t require a business license, please confirm/Declare"}
                            id={"business_activity"}
                            key={"business_activity"}
                        />

                    </Grid.Column>
                </Grid.Row>
                <Divider className={"blue__divider"}/>

                <Grid.Row>
                    <Grid.Column width={16} className={"header__input_text header_text_uppercase"}>
                        Beneficial owner’s declaration - who own or control at least 25% of the company’s shares directly or through other companies
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
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"Upload a Declaration for the beneficial owner and copy of the ID document of the Legal Representative/s of the company"}
                            id={"declaration"}
                            key={"declaration"}
                        />


                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"Confirm upload of declaration  (Beneficial owners declaration - the Beneficial owner (BO) of the company is a physical person, who has 25% or more than 25% of the company or otherwise exercises control over the company)."}
                            id={"confirm_declaration"}
                            key={"confirm_declaration"}
                        />


                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={"Copy of the ID Document (Passport or ID Card) of the Legal representative/s (Director/s, CEO/s, Manager/s or Owner of the business)"}
                            id={"copty_id_document"}
                            key={"copty_id_document"}
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

export default LegalEntity;
