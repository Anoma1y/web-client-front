import {
    setUserKYC,
    setUserSingle,
    changeIndividualUserImage,
    changeIndividualUserProfile
} from 'actions/admin';

import AdminLib from "libs/ApiLib/AdminLib";
import Config from 'libs/config';
import _ from 'underscore';

export const handleSetUserByID = value => {
    return (dispatch, getState) => {
        const findImage = (OBJECT, KEYS) => {
            return _.findKey(OBJECT, function(value, key) {
                return key.indexOf(KEYS) >= 0;
            });
        };
        AdminLib.getUsersById(value)
            .then((userData) => {
                const {
                    CreatedAt,
                    ID,
                    email,
                    is_kyc_passed,
                    is_verified,
                    kyc_type,
                    kyc_id,
                    roles
                } = userData.data;
                const { jwt: TOKEN } = getState().user;
                dispatch(setUserSingle({
                    CreatedAt,
                    ID,
                    email,
                    is_kyc_passed,
                    is_verified,
                    kyc_type,
                    kyc_id,
                    roles
                }));
                AdminLib.getKYCById(kyc_id, TOKEN).then((kycData) => {
                    const KYC_DATA = JSON.parse(kycData.data.content);
                    if (kyc_type === 'individual') {
                        const USER_IMAGE_ID = _.compact(Object.values(KYC_DATA.individualUserFile)).join(',');
                        AdminLib.getKYCImage(USER_IMAGE_ID, TOKEN).then((kycImage) => {
                            const IMAGE = _.indexBy(kycImage.data, 'ID');
                            const {
                                personalUserDocument,
                                utilityBill
                            } = KYC_DATA.individualUserFile;
                            dispatch(changeIndividualUserImage({
                                personalUserDocument:
                                    findImage(IMAGE, personalUserDocument) !== undefined
                                        ? `${Config.url}static/${IMAGE[findImage(IMAGE, personalUserDocument)].filename}`
                                        : '',
                                utilityBill:
                                    findImage(IMAGE, utilityBill) !== undefined
                                        ? `${Config.url}static/${IMAGE[findImage(IMAGE, utilityBill)].filename}`
                                        : ''
                            }));
                        })
                        dispatch(changeIndividualUserProfile(KYC_DATA.individualUserInformation));                        
                    } else if (kyc_type === 'legal') {
                        // companyUserInformation
                        // companyInformation
                        // sourceFunds
                        
                        
                    }

                })
                    .catch((err) => {
                        console.log(err);
                    })
            });
    }
};
