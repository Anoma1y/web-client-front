import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider,
} from 'semantic-ui-react';
import { changeInputBeneficial } from 'actions/settings';
import IdentificationImgUpload from './IdentificationImgUpload';

class Beneficial extends Component {

    renderUploadInfoBeneficial = () => {
        const {
            legalEntityBeneficial,
            indexBeneficial
        } = this.props;

        return legalEntityBeneficial.map((item, index) => {
            return (
                <Grid.Row key={`${item.id}_${indexBeneficial}`}>
                    <Grid.Column width={16}>
                        <IdentificationImgUpload
                            description={item.description}
                            id={`${item.id}_${indexBeneficial}`}
                            indexBeneficial={this.props.indexBeneficial}
                            objectFile={item.objectFile}
                        />
                    </Grid.Column>
                    { index !== (legalEntityBeneficial.length - 1) ?
                        <Grid.Column width={16}>
                            <Divider/>
                        </Grid.Column>
                        : null
                    }
                </Grid.Row>
            )
        })
    }

    handleChange = (event) => {
         const {
             value,
             id
         } = event.target;
         const {
             indexBeneficial,
             changeInputBeneficial
         } = this.props;
        changeInputBeneficial({
            indexBeneficial,
            keyBeneficial: id,
            valueBeneficial: value
        });
    }

    render() {
        const {
            settings,
            indexBeneficial
        } = this.props;
        return (
            <Grid.Row className={'beneficial__wrapper'}>
                <Grid.Column>
                    <Grid>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Name'}
                                        id={'Name'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Name}
                                        className={settings.beneficial[indexBeneficial].Name ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Name</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Surname'}
                                        id={'Surname'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Surname}
                                        className={settings.beneficial[indexBeneficial].Surname ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Surname</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Address'}
                                        id={'Addres'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Addres}
                                        className={settings.beneficial[indexBeneficial].Addres ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Address</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'City'}
                                        id={'City'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].City}
                                        className={settings.beneficial[indexBeneficial].City ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>City</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Country'}
                                        id={'Country'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Country}
                                        className={settings.beneficial[indexBeneficial].Country ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Country</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label style={{width: '50%'}}>
                                    <input
                                        type='text'
                                        placeholder={'Zip'}
                                        id={'Zip'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Zip}
                                        className={settings.beneficial[indexBeneficial].Zip ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Zip</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Birth day'}
                                        id={'Dateofbirth'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Dateofbirth}
                                        className={settings.beneficial[indexBeneficial].Dateofbirth ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Birth day</span>
                                </label>
                            </Grid.Column>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label>
                                    <input
                                        type='text'
                                        placeholder={'Email'}
                                        id={'Email'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Email}
                                        className={settings.beneficial[indexBeneficial].Email ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Email</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row className={'auth_input settings__information'}>
                            <Grid.Column widescreen={8} computer={8} tablet={8} mobile={16}>
                                <label >
                                    <input
                                        type='text'
                                        placeholder={'Phone'}
                                        id={'Phone'}
                                        onChange={this.handleChange}
                                        value={settings.beneficial[indexBeneficial].Phone}
                                        className={settings.beneficial[indexBeneficial].Phone ? 'populated' : ''}
                                    />
                                    <span className={'auth_input-span'}>Phone</span>
                                </label>
                            </Grid.Column>
                        </Grid.Row>
                        {this.renderUploadInfoBeneficial()}
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {
    changeInputBeneficial
})(Beneficial);

