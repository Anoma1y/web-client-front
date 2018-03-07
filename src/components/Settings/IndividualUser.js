import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider
} from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import PersonInformation from './PersonInformation';
import { SettingsButton } from './SettingsButton';

class IndividualUser extends Component {

    renderUploadInfo = () => {
        const { individualUser } = this.props.settings;
        return individualUser.map((item, index) => {
            return (
                <Grid.Row key={item.id}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                        />
                    </Grid.Column>
                    { index !== (individualUser.length - 1) ?
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
                <PersonInformation />
                {this.renderUploadInfo()}
                <SettingsButton />
            </Grid>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {

})(IndividualUser);


