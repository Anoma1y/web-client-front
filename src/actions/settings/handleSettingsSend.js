import {
    changeModalSettings,
    changeSettingsError,
    changeSettingsSuccess
} from 'actions/settings';
import KYC from 'libs/ApiLib/KYC';

export const handleSettingsSend = value => {
    return (dispatch, getState) => {
        const {
            jwt: TOKEN
        } = getState().user;
        const SUCCESS_TEXT = 'We have received your details, thank you. We’ll review all KYC requests together with approving applications. So if you receive a link to pay for your applications that means you successfully passed the KYC procedure. Please note that we might ask you to share some additional details.';
        if (value === 'individual') {
            const {
                individualUserFile,
                individualUserInformation
            } = getState().settings;
            const data = {
                individualUserFile,
                individualUserInformation
            };
            KYC.sendKYC(0, data, TOKEN)
                .then(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(true));
                    dispatch(changeSettingsError(SUCCESS_TEXT));
                })
                .catch(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(false));
                    dispatch(changeSettingsError("Error"));
                })
        }
        else if (value === 'entity'){
            const {
                personCompanyFile,
                companyFile,
                beneficialFile,
                companyUserInformation,
                companyInformation,
                beneficial,
                sourceFunds
            } = getState().settings;
            const data = {
                personCompanyFile,
                companyFile,
                beneficialFile: Object.values(beneficialFile),
                companyUserInformation,
                companyInformation,
                beneficial: Object.values(beneficial),
                sourceFunds
            };
            KYC.sendKYC(1, data, TOKEN)
                .then(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(true));
                    dispatch(changeSettingsError(SUCCESS_TEXT));
                })
                .catch(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(false));
                    dispatch(changeSettingsError("Error"));
                })
        }
    }
};