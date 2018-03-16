import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';

class PersonCompanyDocument extends Component {
    
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
                }]
        }
    }

    renderUploadInfoCompany = () => {
        const { personCompanyFile } = this.state;
        const {
            companyUserImage
        } = this.props.settings;
        return personCompanyFile.map((item, index)=> {
            return (
                <Grid.Row className={'settings__company_uploadInfo'} key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            objectFile={item.objectFile}
                            imageValue={companyUserImage[item.id]}
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

    render() {
        return this.renderUploadInfoCompany();
    }
}

export default connect(state => ({ settings: state.settings }), {

})(PersonCompanyDocument);

