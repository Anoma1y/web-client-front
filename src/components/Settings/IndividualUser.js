import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import PersonInformation from './PersonInformation';
import SettingsButton from './SettingsButton';
import { INDIVIDUAL_USER_DOCUMENT } from 'libs/messages';

class IndividualUser extends Component {

    renderUploadInfo = () => {
        const {
            individualUserImage
        } = this.props.settings;
        return INDIVIDUAL_USER_DOCUMENT.map((item, index) => {
            return (
                <Grid.Row key={item.ID}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.DESCRIPTION}
                            id={item.ID}
                            objectFile={item.OBJECT_FILE}
                            imageValue={Object.values(individualUserImage)[index]}
                        />
                    </Grid.Column>
                    { index !== (INDIVIDUAL_USER_DOCUMENT.length - 1) ?
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
                <PersonInformation stateObject={'individualUserInformation'}/>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Divider />
                    </Grid.Column>
                </Grid.Row>
                {this.renderUploadInfo()}
                <SettingsButton
                    settingsOption={'individual'}
                />
            </Grid>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {

})(IndividualUser);


