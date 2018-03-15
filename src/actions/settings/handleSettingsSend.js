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
                })
                .catch(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(false));
                    dispatch(changeSettingsError("Error"));
                })
        }
    }
};