import Login from 'libs/ApiLib/Login';
import { push } from 'react-router-redux';
import {
    initIdenfified,
    initEmail,
    putToken,
    deleteToken,
    putRoles,
    initKycType,
    initID
} from 'actions/users';
import {
    initialUserProfile,
    initialCompanyUserProfile,
    initialCompanyProfile,
    initialBeneficialProfle,
    initialUserImage,
    initialCompanyImage,
    initialCompanyUserImage,
    initialBeneficialmage,
    initialUserFile,
    initialCompanyUserFile,
    initialCompanyFile,
    initialBeneficialFile,
    changeSourceFunds,
    incrementBeneficialID
} from 'actions/settings';
import _ from 'underscore';
import { redirectToSignup } from 'actions/redirect';
import KYC from 'libs/ApiLib/KYC';
import Config from 'libs/config';

export const initialUser = token => {
    return (dispatch, getState) => {
        Login.getUser(token).then((user) =>{
            const {
                ID,
                email,
                is_kyc_passed,
                roles,
                kyc_type
            } = user.data;
            dispatch(initIdenfified(is_kyc_passed));
            localStorage.setItem('user_id', ID);
            localStorage.setItem('jwt', token);
            localStorage.setItem('is_kyc_passed', is_kyc_passed);
            localStorage.setItem('roles', roles);
            localStorage.setItem('kyc_type', kyc_type);
            localStorage.setItem('email', email);

            dispatch(initID(ID));
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
                            dispatch(changeSourceFunds(INITIAL_DATA.sourceFunds));
                            dispatch(initialCompanyUserFile(INITIAL_DATA.personCompanyFile));
                            dispatch(initialCompanyFile(INITIAL_DATA.companyFile));

                            KYC.getKYCImage(imageUSER_COMPANY_ID, token).then((userCompanyImage) => {
                                const IMAGE = _.indexBy(userCompanyImage.data, 'ID');
                                const {
                                    personalUserCompanyDocument,
                                    representation,
                                    certificateActualStatus
                                } = INITIAL_DATA.personCompanyFile;
                                dispatch(initialCompanyUserImage({
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

                            const {
                                beneficialFile
                            } = INITIAL_DATA;

                            const BENEFICIAL_FILE = INITIAL_DATA.beneficialFile.reduce((result, { ...beneficialFile }, index) => {
                                result[index] = {...beneficialFile};
                                return result;
                            }, {});
                            const BENEFICIAL_PROFILE = INITIAL_DATA.beneficial.reduce((result, { ...beneficial}, index) => {
                                result[index] = {...beneficial};
                                return result;
                            }, {});
                            const INCREMENT_ID = Object.keys(BENEFICIAL_FILE).length - 1;

                            dispatch(incrementBeneficialID(INCREMENT_ID));
                            dispatch(initialBeneficialFile(BENEFICIAL_FILE));
                            dispatch(initialBeneficialProfle(BENEFICIAL_PROFILE));

                            const BENEFICIAL_IMAGE = imageBENEFICIAL_ID.map((item) => {
                                return Object.values(item);
                            }).reduce((acc, items) => {
                                return acc.concat(items);
                            }, []);

                            KYC.getKYCImage(_.compact(BENEFICIAL_IMAGE).join(','), token).then((beneficialImage) => {
                                const IMAGE = _.indexBy(beneficialImage.data, 'ID');
                                const DATA_IMAGE_BENEFICIAL = INITIAL_DATA.beneficialFile.reduce((result, {  }, index) => {
                                    result[index] = {
                                        personalBeneficialDocument:
                                            findImage(IMAGE, beneficialFile[index].personalBeneficialDocument) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, beneficialFile[index].personalBeneficialDocument)].filename}`
                                                : '',
                                        declarationBeneficialOwned:
                                            findImage(IMAGE, beneficialFile[index].declarationBeneficialOwned) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, beneficialFile[index].declarationBeneficialOwned)].filename}`
                                                : '',
                                        legalRepresentative:
                                            findImage(IMAGE, beneficialFile[index].legalRepresentative) !== undefined
                                                ? `${Config.url}static/${IMAGE[findImage(IMAGE, beneficialFile[index].legalRepresentative)].filename}`
                                                : ''
                                    };
                                    return result;
                                }, {});
                                dispatch(initialBeneficialmage(DATA_IMAGE_BENEFICIAL));
                            }).catch((err) => console.log(err));
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

            if (PATH === '/' || PATH === '/signup' || PATH === '/login') {
                dispatch(push('/dashboard'));
            }

        }).catch(() => {
            dispatch(deleteToken());
            localStorage.removeItem('user_id');
            localStorage.removeItem('jwt');
            localStorage.removeItem('roles');
            localStorage.removeItem('email');
            localStorage.removeItem('is_kyc_passed');
            localStorage.removeItem('kyc_type');
            dispatch(redirectToSignup());
        })
    }
};
