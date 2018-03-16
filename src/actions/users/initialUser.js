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
    initialUserFile,
    initialUserProfile,
    initialUserImage,
    incrementBeneficialID,
    initialBeneficialFile,
    initialBeneficialProfle,
    initialCompanyImage,
    initialCompanyFile,
    initialCompanyProfile,
    initialCompanyUserImage,
    initialCompanyUserFile,
    initialCompanyUserProfile,
    initialIBeneficialmage

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
                            status
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
                                    dispatch(initialUserImage({
                                        personalUserDocument: findImage(IMAGE, INITIAL_DATA.individualUserFile.personalUserDocument) !== undefined ? `${Config.url}static/${IMAGE[findImage(IMAGE, INITIAL_DATA.individualUserFile.personalUserDocument)].filename}` : '',
                                        utilityBill: findImage(IMAGE, INITIAL_DATA.individualUserFile.utilityBill) !== undefined ? `${Config.url}static/${IMAGE[findImage(IMAGE, INITIAL_DATA.individualUserFile.utilityBill)].filename}` : ''
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
                            
                            const BENEFICIAL_IMAGE = imageBENEFICIAL_ID.map((item) => {
                                return Object.values(item);
                            }).reduce((acc, items) => {
                                return acc.concat(items);
                            }, [])
                            console.log(INITIAL_DATA);
                            KYC.getKYCImage(_.compact(BENEFICIAL_IMAGE).join(','), token).then((beneficialImage) => {
                                const IMAGE = _.indexBy(beneficialImage.data, 'ID');
                                const DATA_IMAGE_BENEFICIAL = imageBENEFICIAL_ID.map((item, index) => {
                                    return {
                                        personalBeneficialDocument: findImage(IMAGE, item.personalBeneficialDocument) === undefined ? "" : IMAGE[findImage(IMAGE, item.personalBeneficialDocument)].filename,
                                        legalRepresentative: findImage(IMAGE, item.legalRepresentative) === undefined ? "" : IMAGE[findImage(IMAGE, item.legalRepresentative)].filename,
                                        declarationBeneficialOwned: findImage(IMAGE, item.declarationBeneficialOwned) === undefined ? "" : IMAGE[findImage(IMAGE, item.declarationBeneficialOwned)].filename,
                                    }
                                })
                                dispatch(initialIBeneficialmage(DATA_IMAGE_BENEFICIAL));
                            }).catch((err) => console.log(err));
                            // KYC.getKYCImage(imageUSER_COMPANY_ID, token)
                            //     .then((image) => {
                            //         const IMAGE = _.indexBy(image.data, 'ID');
                            //         const personalUserDocumentID = findImage(IMAGE, INITIAL_DATA.individualUserFile.personalUserDocument);
                            //         const utilityBillID = findImage(IMAGE, INITIAL_DATA.individualUserFile.utilityBill);
                            //         dispatch(initialUserImage({
                            //             personalUserDocument: `${Config.url}static/${IMAGE[personalUserDocumentID].filename}`,
                            //             utilityBill: `${Config.url}static/${IMAGE[utilityBillID].filename}`
                            //         }));
                            //     })
                            //     .catch((err) => {
                            //         console.log(err);
                            //     })
                            // companyFile
                                // businessActivityLicense
                                // businessRegistrationDocument
                                // declare
                                // document3months
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
