import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import IdentificationImgUpload from './IdentificationImgUpload';
import PersonInformation from './PersonInformation';
import { SettingsButton } from './SettingsButton';

class IndividualUser extends Component {

    renderUploadInfo = () => {
        const { individualUser } = this.props.settings;
        return individualUser.map(item => {
            return (
                <Grid.Row key={item.id}>
                    <Grid.Column>
                        <IdentificationImgUpload
                            description={item.description}
                            id={item.id}
                        />
                    </Grid.Column>
                </Grid.Row>
            )
        })
    }

    render() {
        console.log(this.props.settings);
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


