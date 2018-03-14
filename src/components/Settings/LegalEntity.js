import React, { Component } from 'react';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import PersonInformation from './PersonInformation';
import CompanyInformation from './CompanyInformation';
import BeneficialComponent from './BeneficialComponent';
import PersonCompanyDocument from './PersonCompanyDocument';
import CompanyDocument from './CompanyDocument';
import SettingsButton from './SettingsButton';

class LegalEntity extends Component {


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

                <PersonCompanyDocument />

                <Divider className={'blue__divider'}/>

                <CompanyInformation />

                <CompanyDocument />

                <Divider className={'blue__divider'}/>

                <Grid.Row>
                    <Grid.Column>
                        <BeneficialComponent />
                    </Grid.Column>
                </Grid.Row>

                <SettingsButton settingsOption={'entity'} />

            </Grid>
        );
    }
}

export default LegalEntity;
