import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid,
    Divider,
    Button
} from 'semantic-ui-react';
import axios from 'axios';

class SettingsButton extends Component {

    handleSubmit = () => {
        const {
            settingsOption
        } = this.props;
        if (settingsOption === "individual") {
            const {
                individualUserFile,
                individualUserInformation
            } = this.props.settings;
            const data = {
                individualUserFile,
                individualUserInformation
            };
            this.sendSettingsInfo(0, data);
        } else if (settingsOption === "entity") {
            const {
                personCompanyFile,
                companyFile,
                beneficialFile,
                companyUserInformation,
                companyInformation,
                beneficial,
                sourceFunds
            } = this.props.settings;
            const data = {
                personCompanyFile,
                companyFile,
                beneficialFile: Object.values(beneficialFile),
                companyUserInformation,
                companyInformation,
                beneficial: Object.values(beneficial),
                sourceFunds
            };
            this.sendSettingsInfo(1, data);
        }
    }

    sendSettingsInfo = (type ,obj) => {
        const url = type === 0 ? `https://account.tokensale.tsrpay.com/api/v1/me` : `https://account.tokensale.tsrpay.com/api/v1/me`;
        const TOKEN = localStorage.getItem("jwt");
        axios.post(url, obj, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        })
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column>
                    <Divider className={"setting_divider"}/>
                    <Button
                        className={"setting__button auth_btn setting__submit"}
                        fluid
                        floated={"right"}
                        onClick={this.handleSubmit}
                    > Submit
                    </Button>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default connect(state => ({ settings: state.settings }), {

})(SettingsButton);



