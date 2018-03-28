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
        const { kyc_type: kyc_type_local } = localStorage;
        const { kyc_type: kyc_type_redux } = this.props.user;
        const check_kyc = kyc_type_local || kyc_type_redux;
        return (
            <Card fluid className={'settings__identification component__main component__shadow'}>
                <Card.Content>
                    <Card.Header className={'settings__identification_header'}>Identification</Card.Header>
                    <Card.Description>
                        <Grid className={'dashboard__component settings_grid_component'}>
                            <Tab
                                menu={{ secondary: true, pointing: true }}
                                panes={check_kyc === 'individual' ? individualUserRender : check_kyc === 'legal' ? legalEntityRender : panes}
                                onTabChange={this.handleTabChange}
                                className={'settings__identification_tabs'}/>
                        </Grid>
                    </Card.Description>
                </Card.Content>

            </Card>
        )
    }
}

export default connect(state => ({ user: state.user }), {
    changeActiveTab
})(Identification);

