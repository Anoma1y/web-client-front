import {
    CHANGE_SETTINGS_INPUT,
    CHANGE_SETTINGS_INPUT_COMPANY,
    CHANGE_SOURCE_FUNDS,
    CHANGE_SETTINGS_INPUT_BENEFICIAL,
    ADD_BENEFICIAL,
    INCREMENT_BENEFICIAL_ID
} from 'actions/settings/types';

const INITIAL_STATE = {
    individualUserFile: {
        personalDocument: 45,
        utilityBill: 127
    },
    personCompanyFile: {
        personalDocument: 123,
        representation: 54,
        certificateActualStatus: 88,
    },
    companyFile: {
        businessRegistrationDocument: 788,
        document3months: 1267,
        businessActivityLicense: 876,
        declare: 7
    },
    beneficialFile: {
        0: {
            personalBeneficialDocument: 3647,
            declarationBeneficialOwned: 4723,
            legalRepresentative: 762222
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
    sourceFunds: '',
    idBeneficial: 0,
    maxBeneficial: 4,
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
    }
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
                }
            }
        default:
            return state
    }
}