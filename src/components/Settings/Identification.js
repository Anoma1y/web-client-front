import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Divider,
    Grid,
    Select,
    Tab
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import LegalEntity from './LegalEntity'
import IndividualUser from "./IndividualUser";

const panes = [
    { menuItem: 'Individual user', render: () => <Tab.Pane><IndividualUser /></Tab.Pane> },
    { menuItem: 'Legal entity', render: () => <Tab.Pane><LegalEntity /></Tab.Pane> },
]
class Identification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateForm: 1
        }
    }

    render() {
        const { templateForm } = this.state;
        const certifyOption = [
            {key: "1", value: "1", text: "Proceeds from commercial activity"},
            {key: "2", value: "2", text: "Credit funds"},
            {key: "3", value: "3", text: "Company profits"},
            {key: "4", value: "4", text: "Sale of property"},
            {key: "5", value: "5", text: "Proceeds from the sale of securities, investment activities"},
            {key: "6", value: "6", text: "Other - specify"}
        ]
        return (
            <Card fluid className={"settings__identification"}>
                <Card.Content>
                    <Card.Header>Identification</Card.Header>
                    <Card.Description>
                        <Grid className={"dashboard__component"}>
                                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />



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