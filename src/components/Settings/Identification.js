import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Grid,
    Tab
} from 'semantic-ui-react';
import LegalEntity from './LegalEntity';
import IndividualUser from "./IndividualUser";

const panes = [
    { menuItem: 'Individual user', render: () => <Tab.Pane><IndividualUser /></Tab.Pane> },
    { menuItem: 'Legal entity', render: () => <Tab.Pane><LegalEntity /></Tab.Pane> },
]

class Identification extends Component {
    render() {
        return (
            <Card fluid className={"settings__identification component__main"}>
                <Card.Content>
                    <Card.Header className={"settings__identification_header"}>Identification</Card.Header>
                    <Card.Description>
                        <Grid className={"dashboard__component"}>
                            <Tab menu={{ secondary: true, pointing: true }} panes={panes} className={"settings__identification_tabs"}/>
                        </Grid>
                    </Card.Description>
                </Card.Content>

            </Card>
        )
    }
}

export default connect((state) => ({
    settings: state.settings
}), {})(Identification);