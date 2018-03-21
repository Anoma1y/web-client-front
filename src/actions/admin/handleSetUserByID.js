import {
    setUserSingle,
    changeIndividualUserImage,
    changeIndividualUserProfile,
    changeLegalUserProfile,
    changeLegalUserImage,
    changeLegalCompanyProfile,
    changeLegalCompanyImage,
    changeLegalBeneficialProfile,
    changeLegalBeneficialImage,
    changeLegalSourceFunds,
    changeBeneficialIncrementID
} from 'actions/admin';
import AdminLib from "libs/ApiLib/AdminLib";
import Config from 'libs/config';
import _ from 'underscore';

export const handleSetUserByID = USER_ID => {
    return dispatch => {
        const findImage = (OBJECT, KEYS) => {
            return _.findKey(OBJECT, function(value, key) {
                return key.indexOf(KEYS) >= 0;
            });
        };
        AdminLib.getUsersById(USER_ID)
            .then((userData) => {
                const {
                    CreatedAt,
                    ID,
                    email,
                    is_blocked,
                    country,
                    is_kyc_passed,
                    is_verified,
                    kyc_type,
                    kyc_id,
                    roles
                } = userData.data;
                dispatch(setUserSingle({
                    CreatedAt,
                    ID,
                    email,
                    is_blocked,
                    country,
                    is_kyc_passed,
                    is_verified,
                    kyc_type,
                    kyc_id,
                    roles
                }));
                AdminLib.getKYCById(kyc_id).then((kycData) => {
                    const KYC_DATA = JSON.parse(kycData.data.content);
                    if (kyc_type === 'individual') {
                        const USER_IMAGE_ID = _.compact(Object.values(KYC_DATA.individualUserFile)).join(',');
                        AdminLib.getKYCImage(USER_IMAGE_ID).then((kycImage) => {
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
                        const imageBENEFICIAL_ID = KYC_DATA.beneficialFile;
                        const imageUSER_COMPANY_ID = _.compact(Object.values(KYC_DATA.personCompanyFile)).join(',');
                        const imageCOMPANY_ID = _.compact(Object.values(KYC_DATA.companyFile)).join(',');

                        AdminLib.getKYCImage(imageUSER_COMPANY_ID).then((userCompanyImage) => {
                            const IMAGE = _.indexBy(userCompanyImage.data, 'ID');
                            const {
                                personalUserCompanyDocument,
                                representation,
                                certificateActualStatus
                            } = KYC_DATA.personCompanyFile;

                            dispatch(changeLegalUserImage({
                                certificateActualStatus:
                                    findImage(IMAGE, certificateActualStatus) !== undefined
                                        ? `${Config.url}static/${IMAGE[findImage(IMAGE, certificateActualStatus)].filename}`
                                        : '',
                                personalUserCompanyDocument:
                                    findImage(IMAGE, personalUserCompanyDocument) !== undefined
                                        ? `${Config.url}static/${IMAGE[findImage(IMAGE, personalUserCompanyDocument)].filename}`
                                        : '',
                                representation:
                                    findImage(IMAGE, representation) !== undefined
                                        ? `${Config.url}static/${IMAGE[findImage(IMAGE, representation)].filename}`
                                        : ''
                            }))
                        }).catch((err) => console.log(err));

                        AdminLib.getKYCImage(imageCOMPANY_ID)
                            .then((companyImage) => {
                                const IMAGE = _.indexBy(companyImage.data, 'ID');
                                const {
                                    businessRegistrationDocument,
                                    document3months,
                                    businessActivityLicense,
                                    declare
                                } = KYC_DATA.companyFile;
                                dispatch(changeLegalCompanyImage({
                                    businessRegistrationDocument:
                                        findImage(IMAGE, businessRegistrationDocument) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, businessRegistrationDocument)].filename}`
                                            : '',
                                    document3months:
                                        findImage(IMAGE, document3months) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, document3months)].filename}`
                                            : '',
                                    businessActivityLicense:
                                        findImage(IMAGE, businessActivityLicense) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, businessActivityLicense)].filename}`
                                            : '',
                                    declare:
                                        findImage(IMAGE, declare) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, declare)].filename}`
                                            : ''
                                }))
                            })
                            .catch((err) => {
                                console.log(err);
                            })

                        const BENEFICIAL_FILE = KYC_DATA.beneficialFile.reduce((result, { ...beneficialFile }, index) => {
                            result[index] = {...beneficialFile};
                            return result;
                        }, {});
                        const BENEFICIAL_PROFILE = KYC_DATA.beneficial.reduce((result, { ...beneficial}, index) => {
                            result[index] = {...beneficial};
                            return result;
                        }, {});
                        const INCREMENT_ID = Object.keys(BENEFICIAL_FILE).length - 1;
                        const BENEFICIAL_IMAGE = imageBENEFICIAL_ID.map((item) => {
                            return Object.values(item);
                        }).reduce((acc, items) => {
                            return acc.concat(items);
                        }, []);

                        AdminLib.getKYCImage(_.compact(BENEFICIAL_IMAGE).join(',')).then((beneficialImage) => {
                            const IMAGE = _.indexBy(beneficialImage.data, 'ID');
                            const DATA_IMAGE_BENEFICIAL = KYC_DATA.beneficialFile.reduce((result, {  }, index) => {
                                result[index] = {
                                    personalBeneficialDocument:
                                        findImage(IMAGE, KYC_DATA.beneficialFile[index].personalBeneficialDocument) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, KYC_DATA.beneficialFile[index].personalBeneficialDocument)].filename}`
                                            : '',
                                    declarationBeneficialOwned:
                                        findImage(IMAGE, KYC_DATA.beneficialFile[index].declarationBeneficialOwned) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, KYC_DATA.beneficialFile[index].declarationBeneficialOwned)].filename}`
                                            : '',
                                    legalRepresentative:
                                        findImage(IMAGE, KYC_DATA.beneficialFile[index].legalRepresentative) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, KYC_DATA.beneficialFile[index].legalRepresentative)].filename}`
                                            : ''
                                };
                                return result;
                            }, {});
                            dispatch(changeLegalBeneficialImage(DATA_IMAGE_BENEFICIAL));
                        }).catch((err) => console.log(err));
                        dispatch(changeLegalUserProfile(KYC_DATA.companyUserInformation));
                        dispatch(changeLegalCompanyProfile(KYC_DATA.companyInformation));
                        dispatch(changeLegalSourceFunds(KYC_DATA.sourceFunds));
                        dispatch(changeLegalBeneficialProfile(BENEFICIAL_PROFILE));
                        dispatch(changeBeneficialIncrementID(INCREMENT_ID));
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
            });
    }
};
