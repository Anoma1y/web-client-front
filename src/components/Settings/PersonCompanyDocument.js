import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import { PERSON_COMPANY_DOCUMENT } from 'libs/messages';

class PersonCompanyDocument extends Component {
    renderUploadInfoCompany = () => {
        const {
            companyUserImage
        } = this.props.settings;
        return PERSON_COMPANY_DOCUMENT.map((item, index)=> {
            return (
                <Grid.Row className={'settings__company_uploadInfo'} key={item.ID}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.DESCRIPTION}
                            id={item.ID}
                            objectFile={item.OBJECT_FILE}
                            imageValue={companyUserImage[item.ID]}
                        />
                    </Grid.Column>
                    { index !== (PERSON_COMPANY_DOCUMENT.length - 1) ?
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

