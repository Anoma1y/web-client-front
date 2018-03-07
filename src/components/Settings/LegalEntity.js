import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Icon,
    Button,
    Divider
} from 'semantic-ui-react';
import Beneficial from './Beneficial';
import IdentificationImgUpload from './IdentificationImgUpload';

import PersonInformation from './PersonInformation';
import CompanyInformation from './CompanyInformation';
import { SettingsButton } from './SettingsButton';



class LegalEntity extends Component {
    constructor(props) {
        super(props);
        this.state = {



            beneficial: [{
                Name: "",
                Addres: "",
                Country: "",
                Dateofbirth: "",
                Phone: "",
                Surname: "",
                City: "",
                Zip: "",
                Email: ""
            }]

        }
    }


    handleAddBeneficial = () => {
        const { beneficial } = this.state;
        this.setState({
            beneficial: [...beneficial, {
                Name: "",
                Addres: "",
                Country: "",
                Dateofbirth: "",
                Phone: "",
                Surname: "",
                City: "",
                Zip: "",
                Email: ""
            }]
        })
    }

    renderUploadInfoCompany = () => {
        const { legalEntityUserCompany } = this.props.settings;
        return legalEntityUserCompany.map((item, index)=> {
            return (
                <Grid.Row className={"settings__company_uploadInfo"} key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                        />
                    </Grid.Column>
                    { index !== (legalEntityUserCompany.length - 1) ?
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
        const { legalEntityAboutCompany } = this.props.settings;
        return legalEntityAboutCompany.map((item, index)=> {
            return (
                <Grid.Row className={"settings__company_uploadInfo"} key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                        />
                    </Grid.Column>
                    { index !== (legalEntityAboutCompany.length - 1) ?
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
            <Grid className={"settings__company"}>
                <h1 className={"settings__company_header"}>Information about the person authorised to represent the company</h1>
                <PersonInformation />

                {this.renderUploadInfoCompany()}
                <Divider className={"blue__divider"}/>

                <CompanyInformation />

                {this.renderUploadInfoRegistration()}
                <Divider className={"blue__divider"}/>

                <Grid.Row>
                    <Grid.Column width={16} className={"header__input_text header_text_uppercase"}>
                        Beneficial owner’s declaration - who own or control at least 25% of the company’s shares directly or through other companies
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {this.state.beneficial.map((item, index) => {
                            return <Beneficial key={index}/>
                        })}
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16} floated={"right"}>
                        <Button
                            className={"beneficial_btn"}
                            onClick={this.handleAddBeneficial}
                        >
                            <Icon name={"plus"} className={"beneficial_icon"}/> Add Beneficial
                        </Button>
                    </Grid.Column>
                </Grid.Row>

                <SettingsButton />
            </Grid>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {

})(LegalEntity);
