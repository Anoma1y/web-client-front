import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import PersonInformation from './PersonInformation';
import SettingsButton from './SettingsButton';

class IndividualUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            individualUserFile: [
                {
                    description: `Submit a personal identity document with photo: Passport, ID, Residence document (both sides)`,
                    id: 'personalUserDocument',
                    objectFile: "individualUserFile"
                },
                {
                    description: 'Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)',
                    id: 'utilityBill',
                    objectFile: "individualUserFile"
                },
            ]
        }
    }

    renderUploadInfo = () => {
        const { individualUserFile } = this.state;
        return individualUserFile.map((item, index) => {
            return (
                <Grid.Row key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                            objectFile={item.objectFile}
                        />
                    </Grid.Column>
                    { index !== (individualUserFile.length - 1) ?
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
            <Grid>
                <PersonInformation stateObject={"individualUserInformation"}/>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Divider />
                    </Grid.Column>
                </Grid.Row>
                {this.renderUploadInfo()}
                <SettingsButton
                    settingsOption={"individual"}
                />
            </Grid>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {

})(IndividualUser);


