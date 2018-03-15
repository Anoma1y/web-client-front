import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Grid,
    Tab
} from 'semantic-ui-react';
import LegalEntity from './LegalEntity';
import IndividualUser from './IndividualUser';

const individualUserRender = [
    { menuItem: 'Individual user', render: () => <Tab.Pane><IndividualUser /></Tab.Pane> }
]
const legalEntityRender = [
    { menuItem: 'Legal entity', render: () => <Tab.Pane><LegalEntity /></Tab.Pane> }
]
const panes = [
    individualUserRender[0],
    legalEntityRender[0]
]

class Identification extends Component {
    render() {
        const kyc_type = localStorage.getItem('kyc_type');
        return (
            <Card fluid className={'settings__identification component__main component__shadow'}>
                <Card.Content>
                    <Card.Header className={'settings__identification_header'}>Identification</Card.Header>
                    <Card.Description>
                        <Grid className={'dashboard__component'}>
                            <Tab menu={{ secondary: true, pointing: true }} panes={kyc_type === 'individual' ? individualUserRender : kyc_type === 'legal' ? legalEntityRender : panes} className={'settings__identification_tabs'}/>
                        </Grid>
                    </Card.Description>
                </Card.Content>

            </Card>
        )
    }
}

export default connect((state) => ({
    settings: state.settings,
    user: state.user
}), {})(Identification);