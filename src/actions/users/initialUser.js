import Login from 'libs/ApiLib/Login';
import { push } from 'react-router-redux';
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken,
    putRoles,
    initKycType
} from 'actions/users';
import {
    initialUserProfile,
    initialCompanyUserProfile,
    initialCompanyProfile,
    initialBeneficialProfle,
    initialUserImage,
    initialCompanyImage,
    initialCompanyUserImage,
    initialIBeneficialmage,
    initialUserFile,
    initialCompanyUserFile,
    initialCompanyFile,
    initialBeneficialFile


} from 'actions/settings';
import _ from 'underscore';
import { redirectToSignup } from 'actions/redirect';
import KYC from 'libs/ApiLib/KYC';
import Config from "libs/config";

export const initialUser = token => {
    return (dispatch, getState) => {
        Login.getUser(token).then((user) =>{
            const {
                email,
                is_kyc_passed,
                roles,
                kyc_type
            } = user.data;
            dispatch(initIdenfified(is_kyc_passed));

            localStorage.setItem("jwt", token);
            localStorage.setItem("is_kyc_passed", is_kyc_passed);
            localStorage.setItem("roles", roles);
            localStorage.setItem("kyc_type", kyc_type);
            localStorage.setItem("email", email);

            dispatch(initEmail(email));
            dispatch(putToken(token));
            dispatch(putRoles(roles));
            dispatch(initKycType(kyc_type));

            const {
                pathname: PATH
            } = getState().routing.location;
            if (kyc_type !== '') {
                KYC.getKYCById(token)
                    .then((data) => {
                        const {
                            content,
                            type,
                        } = data.data;
                        const findImage = (OBJECT, KEYS) => {
                            return _.findKey(OBJECT, function(value, key) {
                                return key.indexOf(KEYS) >= 0;
                            });
                        }
                        if (type === 'individual') {
                            const INITIAL_DATA = JSON.parse(content);
                            const imageID = _.compact(Object.values(INITIAL_DATA.individualUserFile)).join(',');
                            KYC.getKYCImage(imageID, token)
                                .then((image) => {
                                    const IMAGE = _.indexBy(image.data, 'ID');
                                    const {
                                        personalUserDocument,
                                        utilityBill
                                    } = INITIAL_DATA.individualUserFile;
                                    dispatch(initialUserImage({
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
                                .catch((err) => {
                                    console.log(err);
                                })
                            dispatch(initialUserFile(INITIAL_DATA.individualUserFile));
                            dispatch(initialUserProfile(INITIAL_DATA.individualUserInformation));

                        } else if (type === 'legal') {

                            const INITIAL_DATA = JSON.parse(content);
                            const imageBENEFICIAL_ID = INITIAL_DATA.beneficialFile;
                            const imageUSER_COMPANY_ID = _.compact(Object.values(INITIAL_DATA.personCompanyFile)).join(',');
                            const imageCOMPANY_ID = _.compact(Object.values(INITIAL_DATA.companyFile)).join(',');

                            dispatch(initialCompanyUserProfile(INITIAL_DATA.companyUserInformation));
                            dispatch(initialCompanyProfile(INITIAL_DATA.companyInformation));
                            dispatch(initialBeneficialProfle(INITIAL_DATA.beneficial));

                            dispatch(initialCompanyUserFile(INITIAL_DATA. personCompanyFile));
                            dispatch(initialCompanyFile(INITIAL_DATA. companyFile));
                            dispatch(initialBeneficialFile(INITIAL_DATA. beneficialFile));

                            KYC.getKYCImage(imageUSER_COMPANY_ID, token).then((userCompanyImage) => {
                                const IMAGE = _.indexBy(userCompanyImage.data, 'ID');
                                const {
                                    personalUserCompanyDocument,
                                    representation,
                                    certificateActualStatus
                                } = INITIAL_DATA.personCompanyFile;
                                dispatch(initialCompanyUserImage({
                                    certificateActualStatus:
                                        findImage(IMAGE, personalUserCompanyDocument) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, personalUserCompanyDocument)].filename}`
                                            : '',
                                    personalUserCompanyDocument:
                                        findImage(IMAGE, representation) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, representation)].filename}`
                                            : '',
                                    representation:
                                        findImage(IMAGE, certificateActualStatus) !== undefined
                                            ? `${Config.url}static/${IMAGE[findImage(IMAGE, certificateActualStatus)].filename}`
                                            : ''
                                }))
                            }).catch((err) => console.log(err));

                            KYC.getKYCImage(imageCOMPANY_ID, token)
                                .then((companyImage) => {
                                    const IMAGE = _.indexBy(companyImage.data, 'ID');
                                    const {
                                        businessRegistrationDocument,
                                        document3months,
                                        businessActivityLicense,
                                        declare
                                    } = INITIAL_DATA.companyFile;
                                    dispatch(initialCompanyImage({
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

                            const BENEFICIAL_IMAGE = imageBENEFICIAL_ID.map((item) => {
                                return Object.values(item);
                            }).reduce((acc, items) => {
                                return acc.concat(items);
                            }, []);

                            KYC.getKYCImage(_.compact(BENEFICIAL_IMAGE).join(','), token).then((beneficialImage) => {
                                const IMAGE = _.indexBy(beneficialImage.data, 'ID');
                                const DATA_IMAGE_BENEFICIAL = imageBENEFICIAL_ID.map(item => {
                                    return {
                                        personalBeneficialDocument:
                                            findImage(IMAGE, item.personalBeneficialDocument) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, item.personalBeneficialDocument)].filename}`
                                                : '',
                                        declarationBeneficialOwned:
                                            findImage(IMAGE, item.declarationBeneficialOwned) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, item.declarationBeneficialOwned)].filename}`
                                                : '',
                                        legalRepresentative:
                                            findImage(IMAGE, item.legalRepresentative) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, item.legalRepresentative)].filename}`
                                                : ''
                                    }
                                })
                                dispatch(initialIBeneficialmage(DATA_IMAGE_BENEFICIAL));
                            }).catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

            if (PATH === "/" || PATH === "/signup" || PATH === "/login") {
                dispatch(push('/dashboard'));
            }

        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem("jwt");
            localStorage.removeItem("roles");
            localStorage.removeItem("email");
            localStorage.removeItem("is_kyc_passed");
            localStorage.removeItem("kyc_type");
            dispatch(redirectToSignup());
        })
    }
};
