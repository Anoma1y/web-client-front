import React, { Component } from 'react';
import {
    Grid,
    Button,
    Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleAddBeneficial } from 'actions/settings';
import Beneficial from './Beneficial';

class BeneficialComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beneficialFile: [{
                description: 'Upload a Declaration for the beneficial owner and copy of the ID document of the Legal Representative/s of the company',
                id: 'personalBeneficialDocument',
                objectFile: 'beneficialFile'
            },{
                description: 'Confirm upload of declaration  (Beneficial owners declaration - the Beneficial owner (BO) of the company is a physical person, who has 25% or more than 25% of the company or otherwise exercises control over the company).',
                id: 'declarationBeneficialOwned',
                objectFile: 'beneficialFile'
            },{
                description: 'Copy of the ID Document (Passport or ID Card) of the Legal representative/s (Director/s, CEO/s, Manager/s or Owner of the business)',
                id: 'legalRepresentative',
                objectFile: 'beneficialFile'
            }]
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.settings.beneficial !== this.props.settings.beneficial || nextProps.settings.settingsInputError !== this.props.settings.settingsInputError;
    }

    handleAddBeneficial = () => {
        const { handleAddBeneficial } = this.props;
        handleAddBeneficial();
    }

    render() {
        const {
            idBeneficial,
            maxBeneficial
        } = this.props.settings;
        const {
            beneficialFile
        } = this.state;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} className={'header__input_text header_text_uppercase'}>
                        Beneficial owner’s declaration - who own or control at least 25% of the company’s shares directly or through other companies
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {Object.keys(this.props.settings.beneficial).map((item, index) => {
                            return <Beneficial
                                key={index}
                                indexBeneficial={index}
                                legalEntityBeneficial={beneficialFile}
                            />
                        })}
                    </Grid.Column>
                </Grid.Row>
                {
                    idBeneficial < (maxBeneficial - 1) ?
                        <Grid.Row>
                            <Grid.Column width={16} floated={'right'}>
                                <Button
                                    className={'beneficial_btn'}
                                    onClick={this.handleAddBeneficial}
                                >
                                    <Icon name={'plus'} className={'beneficial_icon'}/> Add Beneficial
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        : null
                }
            </Grid>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {
    handleAddBeneficial
})(BeneficialComponent);
