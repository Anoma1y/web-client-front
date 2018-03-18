import {
    CHANGE_SETTINGS_INPUT,
    CHANGE_SETTINGS_INPUT_COMPANY,
    CHANGE_SOURCE_FUNDS,
    CHANGE_SETTINGS_INPUT_BENEFICIAL,
    ADD_BENEFICIAL,
    INCREMENT_BENEFICIAL_ID,
    CHANGE_SETTINGS_DOCUMENT_INDIVIDUAL_USER,
    CHANGE_SETTINGS_DOCUMENT_ENTITY_USER,
    CHANGE_SETTINGS_DOCUMENT_ENTITY_COMPANY,
    CHANGE_SETTINGS_DOCUMENT_ENTITY_BENEFICIAL,
    CHANGE_SETTINGS_MODAL,
    CHANGE_SETTINGS_ERROR,
    CHANGE_SETTINGS_SUCCESS,
    SETTINGS_INITIAL_USER_FILE,
    SETTINGS_INITIAL_USER_PROFILE,
    SETTINGS_INITIAL_USER_IMAGE,
    SETTINGS_INITIAL_COMPANY_USER_PROFILE,
    SETTINGS_INITIAL_COMPANY_USER_FILE,
    SETTINGS_INITIAL_COMPANY_PROFILE,
    SETTINGS_INITIAL_COMPANY_FILE,
    SETTINGS_INITIAL_BENEFICIAL,
    SETTINGS_INITIAL_BENEFICIAL_FILE,
    SETTINGS_INITIAL_COMPANY_USER_IMAGE,
    SETTINGS_INITIAL_COMPANY_IMAGE,
    SETTINGS_INITIAL_BENEFICIAL_IMAGE,
    CHANGE_SETTINGS_INPUT_ERROR
} from 'actions/settings/types';

const INITIAL_STATE = {
    individualUserFile: {
        personalUserDocument: null,
        utilityBill: null
    },
    individualUserImage: {
        personalUserDocument: '',
        utilityBill: ''
    },
    companyUserImage: {
        personalUserCompanyDocument: '',
        representation: '',
        certificateActualStatus: '',
    },
    companyImage: {
        businessRegistrationDocument: '',
        document3months: '',
        businessActivityLicense: '',
        declare: ''
    },
    beneficialImage: {
        0: {
            personalBeneficialDocument: '',
            declarationBeneficialOwned: '',
            legalRepresentative: ''
        }
    },
    personCompanyFile: {
        personalUserCompanyDocument: null,
        representation: null,
        certificateActualStatus: null,
    },
    companyFile: {
        businessRegistrationDocument: null,
        document3months: null,
        businessActivityLicense: null,
        declare: null
    },
    beneficialFile: {
        0: {
            personalBeneficialDocument: null,
            declarationBeneficialOwned: null,
            legalRepresentative: null
        }
    },
    individualUserInformation: {
        Name: '',
        Addres: '',
        Country: '',
        Dateofbirth: '',
        Phone: '',
        Surname: '',
        City: '',
        Zip: '',
        Email: ''
    },
    companyUserInformation: {
        Name: '',
        Addres: '',
        Country: '',
        Dateofbirth: '',
        Phone: '',
        Surname: '',
        City: '',
        Zip: '',
        Email: ''
    },
    companyInformation: {
        companyCompanyName: '',
        companyTaxIDnumber: '',
        companyTaxrezidencecountry: '',
        companyCity: '',
        companyZip: '',
        companyLegaladdress: '',
        companyActualbusinessplaceaddress: '',
        companyLinktopubliccompanyregister: '',
        companyEmail: '',
        companyPhone: '',
        companyDescriptioncompanydoes: '',
        companyWebsites: '',
    },
    beneficial: {
        0: {
            Name: '',
            Addres: '',
            Country: '',
            Dateofbirth: '',
            Phone: '',
            Surname: '',
            City: '',
            Zip: '',
            Email: '',
        },
    },
    sourceFunds: '',
    idBeneficial: 0,
    maxBeneficial: 4,
    settingsModalIsOpen: false,
    settingsError: null,
    success: false,
    settingsInputError: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_SETTINGS_MODAL:
            return { ...state, settingsModalIsOpen: action.payload };
        case CHANGE_SETTINGS_ERROR:
            return { ...state, settingsError: action.payload };
        case CHANGE_SETTINGS_INPUT_ERROR:
            return { ...state, settingsInputError: action.payload };
        case SETTINGS_INITIAL_USER_FILE:
            return { ...state, individualUserFile: action.payload };
        case SETTINGS_INITIAL_USER_PROFILE:
            return { ...state, individualUserInformation: action.payload };
        case SETTINGS_INITIAL_USER_IMAGE:
            return { ...state, individualUserImage: action.payload };
        case SETTINGS_INITIAL_COMPANY_USER_PROFILE:
            return { ...state, companyUserInformation: action.payload };
        case SETTINGS_INITIAL_COMPANY_USER_FILE:
            return { ...state, personCompanyFile: action.payload };
        case SETTINGS_INITIAL_COMPANY_PROFILE:
            return { ...state, companyInformation: action.payload };
        case SETTINGS_INITIAL_COMPANY_FILE:
            return { ...state, companyFile: action.payload };
        case SETTINGS_INITIAL_BENEFICIAL:
            return { ...state, beneficial: action.payload };
        case SETTINGS_INITIAL_BENEFICIAL_FILE:
            return { ...state, beneficialFile: action.payload };
        case SETTINGS_INITIAL_COMPANY_USER_IMAGE:
            return { ...state, companyUserImage: action.payload };
        case SETTINGS_INITIAL_COMPANY_IMAGE:
            return { ...state, companyImage: action.payload };
        case SETTINGS_INITIAL_BENEFICIAL_IMAGE:
            return { ...state, beneficialImage: action.payload };
        case CHANGE_SETTINGS_SUCCESS:
            return { ...state, success: action.payload };
        case CHANGE_SETTINGS_INPUT:
            const {
                stateInput,
                keyInput,
                valueInput
            } = action.payload;
            const newInputObject = {
                ...state[stateInput]
            };
            newInputObject[keyInput] = valueInput;
            return {
                ...state,
                [stateInput]: newInputObject
            }
        case CHANGE_SETTINGS_INPUT_COMPANY:
            const {
                keyCompany,
                valueCompany
            } = action.payload;
            const newCompanyObject = {
                ...state.companyInformation
            };
            newCompanyObject[keyCompany] = valueCompany;
            return {
                ...state,
                companyInformation: newCompanyObject
            }
        case CHANGE_SOURCE_FUNDS:
            return { ...state, sourceFunds: action.payload };
        case CHANGE_SETTINGS_INPUT_BENEFICIAL:
            const {
                indexBeneficial,
                keyBeneficial,
                valueBeneficial
            } = action.payload;
            const newBeneficialObject = {
                [indexBeneficial]: {
                    ...state.beneficial[indexBeneficial]
                }
            };
            newBeneficialObject[indexBeneficial][keyBeneficial] = valueBeneficial;
            return {
                ...state,
                beneficial: {
                    ...state.beneficial,
                    [indexBeneficial]: {
                        ...newBeneficialObject[indexBeneficial]
                    }
                }
            }
        case INCREMENT_BENEFICIAL_ID:
            return { ...state, idBeneficial: action.payload };
        case ADD_BENEFICIAL:
            return {
                ...state,
                beneficial: {
                    ...state.beneficial,
                    [action.payload]: {
                        Name: '',
                        Addres: '',
                        Country: '',
                        Dateofbirth: '',
                        Phone: '',
                        Surname: '',
                        City: '',
                        Zip: '',
                        Email: ''
                    }
                },
                beneficialFile: {
                    ...state.beneficialFile,
                    [action.payload]: {
                        personalBeneficialDocument: null,
                        declarationBeneficialOwned: null,
                        legalRepresentative: null
                    }
                },
                beneficialImage: {
                    ...state.beneficialImage,
                    [action.payload]: {
                        personalBeneficialDocument: '',
                        declarationBeneficialOwned: '',
                        legalRepresentative: ''
                    }
                }
            }
        case CHANGE_SETTINGS_DOCUMENT_INDIVIDUAL_USER:
            return {
                ...state, individualUserFile:  {
                        ...state.individualUserFile,
                        [action.payload.id]: action.payload.documentID
                    }
            };
        case CHANGE_SETTINGS_DOCUMENT_ENTITY_USER:
            return {
                ...state, personCompanyFile: {
                    ...state.personCompanyFile,
                    [action.payload.id]: action.payload.documentID
                }
            };
        case CHANGE_SETTINGS_DOCUMENT_ENTITY_COMPANY:
            return {
                ...state, companyFile: {
                    ...state.companyFile,
                    [action.payload.id]: action.payload.documentID
                }
            };
        case CHANGE_SETTINGS_DOCUMENT_ENTITY_BENEFICIAL:
            const {
                indexBeneficialFile,
                keyBeneficialFile,
                valueBeneficialFile
            } = action.payload;
            const newBeneficialFileObject = {
                [indexBeneficialFile]: {
                    ...state.beneficialFile[indexBeneficialFile]
                }
            };
            newBeneficialFileObject[indexBeneficialFile][keyBeneficialFile] = valueBeneficialFile;
            return {
                ...state,
                beneficialFile: {
                    ...state.beneficialFile,
                    [indexBeneficialFile]: {
                        ...newBeneficialFileObject[indexBeneficialFile]
                    }
                }
            }
        default:
            return state
    }
}
