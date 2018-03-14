import React, { Component } from 'react';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import PersonInformation from './PersonInformation';
import CompanyInformation from './CompanyInformation';
import BeneficialComponent from './BeneficialComponent';
import SettingsButton from './SettingsButton';

class LegalEntity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personCompanyFile: [
                {
                    description: 'Submit a director’s personal identity document: One of the following Passport, ID, Residence Document (both sides)',
                    id: 'personalUserCompanyDocument',
                    objectFile: 'personCompanyFile'
                },
                {
                    description: 'Basis of representation (statute, letter of attorney, etc.)',
                    id: 'representation',
                    objectFile: 'personCompanyFile'
                },
                {
                    description: 'If the company register of the country does not provide public data: Certificate of actual status. Upload a Certificate of actual status The certificate of actual status should be issued by the official Company register or a similar authorized institution in the country of registration of your company: the Certificate of actual status should contain: the company name, address, seat, registration number/ tax number or similar, Legal representatives (Managers) names, business activity. The document should be issued no more than 6 months before the date of upload. A document confirming the right to represent the company',
                    id: 'certificateActualStatus',
                    objectFile: 'personCompanyFile'
                }],
            companyFile: [
                {
                    description: 'Upload a Business registration document. Please upload a copy of ONE of the following types documents: a business registration; a bank statement (2 weeks old), a credit card statement, a utility bill, an insurance contract, a receipt for paid insurance, an invoice, or any other type of contract or document, which contains the company address, BULSTAT, VAT, Tax number',
                    id: 'businessRegistrationDocument',
                    objectFile: 'companyFile'
                },{
                    description: 'The document should be no older than 3 months by the date of upload.)',
                    id: 'document3months',
                    objectFile: 'companyFile'
                },{
                    description: 'Upload Business activity license requirement. If your business activity is subject to licensing and regulation by an independent authority (for instance, such business activities are: insurance, gambling (casinos, online casinos, other gaming activities), investment brokerage, advisory asset management, financial services, pharmaceutical products trade, precious metals trade, securities trade, etc.), please upload a copy of your company license or permit.',
                    id: 'businessActivityLicense',
                    objectFile: 'companyFile'
                },{
                    description: 'If your business activity doesn’t require a business license, please confirm/Declare',
                    id: 'declare',
                    objectFile: 'companyFile'
                }
            ]
        }
    }

    renderUploadInfoCompany = () => {
        const { personCompanyFile } = this.state;
        return personCompanyFile.map((item, index)=> {
            return (
                <Grid.Row className={'settings__company_uploadInfo'} key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            objectFile={item.objectFile}
                        />
                    </Grid.Column>
                    { index !== (personCompanyFile.length - 1) ?
                        <Grid.Column width={16}>
                            <Divider/>
                        </Grid.Column>
                        : null
                    }
                </Grid.Row>
            )
        })
    }

    renderUploadInfoRegistration = () => {
        const { companyFile } = this.state;
        return companyFile.map((item, index)=> {
            return (
                <Grid.Row className={'settings__company_uploadInfo'} key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            objectFile={item.objectFile}
                        />
                    </Grid.Column>
                    { index !== (companyFile.length - 1) ?
                        <Grid.Column width={16}>
                            <Divider/>
                        </Grid.Column>
                        : null
                    }
                </Grid.Row>
            )
        })
    }

    render() {
        return (
            <Grid className={'settings__company'}>
                <h1 className={'settings__company_header'}>Information about the person authorised to represent the company</h1>
                <PersonInformation stateObject={'companyUserInformation'}/>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Divider />
                    </Grid.Column>
                </Grid.Row>
                {this.renderUploadInfoCompany()}
                <Divider className={'blue__divider'}/>

                <CompanyInformation />

                {this.renderUploadInfoRegistration()}
                <Divider className={'blue__divider'}/>

                <Grid.Row>
                    <Grid.Column>
                        <BeneficialComponent />
                    </Grid.Column>
                </Grid.Row>

                <SettingsButton
                    settingsOption={'entity'}
                />
            </Grid>
        );
    }
}

export default LegalEntity;
