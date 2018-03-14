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
    CHANGE_SETTINGS_DOCUMENT_ENTITY_BENEFICIAL
} from 'actions/settings/types';

const INITIAL_STATE = {
    individualUserFile: {
        personalUserDocument: null,
        utilityBill: null
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
        }
    },
    sourceFunds: '',
    idBeneficial: 0,
    maxBeneficial: 4,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
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
