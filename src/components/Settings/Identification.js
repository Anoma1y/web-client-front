import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Grid,
    Tab
} from 'semantic-ui-react';
import {changeActiveTab} from 'actions/settings';
import LegalEntity from './LegalEntity';
import IndividualUser from './IndividualUser';
import {handleInitialSettings} from 'actions/settings';

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
    handleTabChange = (e, data) => {
        const currentTab = data.panes[data.activeIndex].menuItem;
        const { changeActiveTab } = this.props;
        if (currentTab === individualUserRender[0].menuItem) {
            changeActiveTab('individual');
        } else if (currentTab === legalEntityRender[0].menuItem) {
            changeActiveTab('legal');
        }
    }

    componentDidMount() {
        const { changeActiveTab } = this.props;
        changeActiveTab('individual');
    }

    render() {
        const { kyc_type } = localStorage;
        return (
            <Card fluid className={'settings__identification component__main component__shadow'}>
                <Card.Content>
                    <Card.Header className={'settings__identification_header'}>Identification</Card.Header>
                    <Card.Description>
                        <Grid className={'dashboard__component'}>
                            <Tab 
                                menu={{ secondary: true, pointing: true }} 
                                panes={kyc_type === 'individual' ? individualUserRender : kyc_type === 'legal' ? legalEntityRender : panes}
                                onTabChange={this.handleTabChange}
                                className={'settings__identification_tabs'}/>
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
}), {
    handleInitialSettings,
    changeActiveTab
})(Identification);