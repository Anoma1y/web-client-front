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
                const singleUser = {
                    CreatedAt: userData.data.CreatedAt,
                    ID: userData.data.ID,
                    email: userData.data.email,
                    is_kyc_passed: userData.data.is_kyc_passed,
                    is_verified: userData.data.is_verified,
                    kyc_type: userData.data.kyc_type,
                    kyc_id: userData.data.kyc_id,
                    roles: userData.data.roles,
                }
                const { jwt } = getState().user;
                dispatch(setUserSingle(singleUser));
                AdminLib.getKYCById(userData.data.kyc_id, jwt).then((kycData) => {
                    const KYC_DATA = JSON.parse(kycData.data.content);
                    const USER_IMAGE_ID = _.compact(Object.values(KYC_DATA.individualUserFile)).join(',');
                    AdminLib.getKYCImage(USER_IMAGE_ID, jwt).then((kycImage) => {
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
                })
                    .catch((err) => {
                        console.log(err);
                    })
            });
    }
};
