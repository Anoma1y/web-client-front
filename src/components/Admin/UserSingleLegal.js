import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Card,
    Image,
    Form
} from 'semantic-ui-react';
import {countryOptions} from "libs/country";
import UserSingleImage from './UserSingleImage';
import UserSingleBeneficial from './UserSingleBeneficial';

class UserSingleLegal extends Component {


    renderBeneficialProfile = () => {
        const {
            beneficial,
            beneficialImage
        } = this.props.admin;
        return Object.keys(beneficial).map((item, index) => {
            return (
                <div key={index}>
                    <UserSingleBeneficial beneficial={beneficial[item]}/>
                    <UserSingleImage text={'Upload a Declaration for the beneficial owner and copy of the ID document of theLegal Representative/s of the company.'} image={beneficialImage[item] !== undefined ? beneficialImage[item].personalBeneficialDocument : ''}/>
                    <UserSingleImage text={'Сonfirm upload of declaration (Beneficial owners declaration - the Beneficial owner(BO) of the company is a physical person, who has 25% or more than 25% of thecompany or otherwise exercises control over the company).'} image={beneficialImage[item] !== undefined ? beneficialImage[item].legalRepresentative : ''}/>
                    <UserSingleImage text={'Copy of the ID Document (Passport, ID Card ) of the Legal representative/s(Director/s, CEO/s, Manager/s or Owner of the business).'} image={beneficialImage[item] !== undefined ? beneficialImage[item].declarationBeneficialOwned : ''}/>
                </div>
            )
        })
    }

    render() {
        const {
            singleUser,
            companyUserInformation,
            companyUserImage,
            companyImage,
            companyInformation,
            sourceFunds,
            beneficial,
            beneficialImage
        } = this.props.admin;
        // beneficialImage
        //     declarationBeneficialOwned
        //     legalRepresentative
        //      personalBeneficialDocument
        // idBeneficial

        const getCountry = (KEY) => {
            const getObj = countryOptions.filter(item => item.key === KEY);
            if (getObj.length !== 0) {
                return getObj[0].text;
            } else return '';
        };
        return (
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {singleUser.kyc_type}
                    </Card.Header>
                    <Card.Description>
                        <Card.Header>
                            INFORMATION ABOUT THE PERSON AUTHORISED TO REPRESENT THE COMPANY
                        </Card.Header>
                        <div className={'admin__user_form'}>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Name' value={companyUserInformation.Name}/>
                                    <Form.Input readOnly fluid label='Surname' value={companyUserInformation.Surname}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Address' value={companyUserInformation.Addres}/>
                                    <Form.Input readOnly fluid label='City' value={companyUserInformation.City}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Country' value={getCountry(companyUserInformation.Country)}/>
                                    <Form.Input readOnly fluid label='ZIP/Postal code' value={companyUserInformation.Zip}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Birth day' value={companyUserInformation.Dateofbirth}/>
                                    <Form.Input readOnly fluid label='Email' value={companyUserInformation.Email}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Phone' value={companyUserInformation.Phone}/>
                                </Form.Group>
                            </Form>
                         </div>
                        <Grid>
                            <UserSingleImage
                                text={'Submit a director’s personal identity document: One of the following Passport, ID, Residence Document (both sides)'}
                                image={companyUserImage.personalUserCompanyDocument}
                            />
                            <UserSingleImage
                                text={'Basis of representation (statute, letter of attorney, etc.)'}
                                image={companyUserImage.representation}
                            />
                            <UserSingleImage
                                text={'If the company register of the country does not provide public data: Certificate of actual status. Upload a Certificate of actual status The certificate of actual status should be issued by the official Company register or a similar authorized institution in the country of registration of your company: the Certificate of actual status should contain: the company name, address, seat, registration number/ tax number or similar, Legal representatives (Managers) names, business activity. The document should be issued no more than 6 months before the date of upload. A document confirming the right to represent the company'}
                                image={companyUserImage.certificateActualStatus}
                            />
                        </Grid>

                    </Card.Description>



                    <Card.Description>
                        <Card.Header>
                            INFORMATION ABOUT THE COMPANY
                        </Card.Header>
                        <div className={'admin__user_sourceFunds'}>
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Company Name' value={companyInformation.companyCompanyName}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Tax ID number' value={companyInformation.companyTaxIDnumber}/>
                                    <Form.Input readOnly fluid label='Tax rezidence country' value={getCountry(companyInformation.companyTaxrezidencecountry)}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='City' value={getCountry(companyInformation.companyCity)}/>
                                    <Form.Input readOnly fluid label='ZIP/Postal code' value={companyInformation.companyZip}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Legal address' value={companyInformation.companyLegaladdress}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Actual business place address' value={companyInformation.companyActualbusinessplaceaddress}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Link to public company register (Business Register)' value={companyInformation.companyLinktopubliccompanyregister}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Email' value={companyInformation.companyEmail}/>
                                    <Form.Input readOnly fluid label='Phone' value={companyInformation.companyPhone}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Description of what your company does' value={companyInformation.companyDescriptioncompanydoes}/>
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input readOnly fluid label='Websites' value={companyInformation.companyWebsites}/>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className={'admin__user_sourceFunds'}>
                            <Form>
                                <Form.Group>
                                    <Form.Input readOnly fluid label={'I hereby certify that origin of funds that is available to company is legal,and its source is:'} value={sourceFunds}/>
                                </Form.Group>
                            </Form>
                        </div>
                        <Grid>
                            <UserSingleImage
                                text={'Upload a Business registration document. Please upload a copy of ONE of thefollowing types documents: a business registration; a bank statement (2 weeksold), a credit card statement, a utility bill, an insurance contract, a receipt for paidinsurance, an invoice, or any other type of contract or document, which containsthe company address, BULSTAT, VAT, Tax number.'}
                                image={companyImage.businessRegistrationDocument}
                            />
                            <UserSingleImage
                                text={'The document should be no older than 3 months by the date of upload.'}
                                image={companyImage.document3months}
                            />
                            <UserSingleImage
                                text={'Upload Business activity license requirement. If your business activity is subject tolicensing and regulation by an independent authority (for instance, such businessactivities are: insurance, gambling (casinos, online casinos, other gamingactivities), investment brokerage, advisory asset management, financial services,pharmaceutical products trade, precious metals trade, securities trade, etc.), pleaseupload a copy of your company license or permit.'}
                                image={companyImage.businessActivityLicense}
                            />
                            <UserSingleImage
                                text={'If your business activity doesn’t require a business license, please confirm/Declare.'}
                                image={companyImage.declare}
                            />
                           </Grid>
                    </Card.Description>
                    <Card.Description>
                        {this.renderBeneficialProfile()}
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
}

export default connect(state => ({ admin: state.admin }), {

})(UserSingleLegal);
