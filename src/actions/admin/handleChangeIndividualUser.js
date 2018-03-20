import {
    changeIndividualUserImage,
    changeIndividualUserProfile
} from './';
import AdminLib from 'libs/ApiLib/AdminLib';
import Config from 'libs/config';
import _ from 'underscore';

export const handleChangeIndividualUser = value => {
    return (dispatch, getState) => {
        const findImage = (OBJECT, KEYS) => {
            return _.findKey(OBJECT, function(value, key) {
                return key.indexOf(KEYS) >= 0;
            });
        };
        const { jwt } = getState().user;
        AdminLib.getKYCById(value, jwt).then((kycData) => {
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
    }
};