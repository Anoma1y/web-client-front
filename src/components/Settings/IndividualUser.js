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
    
    constructor(props) {
        super(props);
        this.state = {
            individualUser: [
                {
                    description: `Submit a personal identity document with photo: Passport, ID, Residence document (both sides)`,
                    id: 'one_passport'
                },
                {
                    description: 'Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)',
                    id: 'one_address'
                },
            ]
        }
    }

    renderUploadInfo = () => {
        const { individualUser } = this.state;
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


