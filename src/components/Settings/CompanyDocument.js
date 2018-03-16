import React, { Component } from 'react';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class CompanyDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
                            imageValue={""}
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
        return this.renderUploadInfoRegistration();
    }
}

export default CompanyDocument;
