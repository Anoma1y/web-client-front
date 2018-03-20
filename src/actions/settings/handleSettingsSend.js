import {
    changeModalSettings,
    changeSettingsError,
    changeSettingsSuccess
} from 'actions/settings';
import { initKycType } from 'actions/users';
import KYC from 'libs/ApiLib/KYC';

export const handleSettingsSend = value => {
    return (dispatch, getState) => {
        const {
            jwt: TOKEN,
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
            const USER_COUNTRY = individualUserInformation.Country;
            KYC.sendKYC(0, data, USER_COUNTRY, TOKEN)
                .then(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(true));
                    dispatch(initKycType(value));
                    localStorage.setItem('kyc_type', value);
                })
                .catch(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(false));
                    dispatch(changeSettingsError("Error"));
                })
        }
        else if (value === 'legal'){
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
            const USER_COUNTRY = companyUserInformation.Country;
            KYC.sendKYC(1, data, USER_COUNTRY, TOKEN)
                .then(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(true));
                    dispatch(initKycType(value));
                    localStorage.setItem('kyc_type', value);
                })
                .catch(() => {
                    dispatch(changeModalSettings(true));
                    dispatch(changeSettingsSuccess(false));
                    dispatch(changeSettingsError("Error"));
                })
        }
    }
};