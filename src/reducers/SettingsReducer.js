import {
    CHANGE_SETTINGS_INPUT,
    CHANGE_SETTINGS_INPUT_COMPANY,
    CHANGE_SOURCE_FUNDS,
    CHANGE_SETTINGS_INPUT_BENEFICIAL,
    ADD_BENEFICIAL
} from 'actions/settings/types';

const INITIAL_STATE = {
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
    // beneficial: [{
    //     Name: '',
    //     Addres: '',
    //     Country: '',
    //     Dateofbirth: '',
    //     Phone: '',
    //     Surname: '',
    //     City: '',
    //     Zip: '',
    //     Email: ''
    // }],
    // beneficial: [{
    //     id: 0,
    //     data: {
    //         Name: '',
    //         Addres: '',
    //         Country: '',
    //         Dateofbirth: '',
    //         Phone: '',
    //         Surname: '',
    //         City: '',
    //         Zip: '',
    //         Email: '',
    //     }
    // }],
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
            // console.log( [
            //     ...state.beneficial.slice(0, indexBeneficial),
            //     {
            //         Name: valueBeneficial,
            //         Addres: '',
            //         Country: '',
            //         Dateofbirth: '',
            //         Phone: '',
            //         Surname: '',
            //         City: '',
            //         Zip: '',
            //         Email: ''
            //     },
            //     ...state.beneficial.slice(indexBeneficial)
            // ]);
            newBeneficialObject[indexBeneficial][keyBeneficial] = valueBeneficial;
            // console.log(
            //     newBeneficialObject
            // );
            // newBeneficial[0]["Name"] = "123"
            // const newBeneficialObject = state.beneficial.slice(0)
            // console.log(newBeneficialObject);
            // newBeneficialObject[indexBeneficial][keyBeneficial] = valueBeneficial;
            return {
                ...state,
                beneficial: {
                    ...state.beneficial,
                    [indexBeneficial]: {
                        ...newBeneficialObject[indexBeneficial]
                    }
                }
            }
        case ADD_BENEFICIAL:

            return {
                ...state,
                // beneficial: [...state.beneficial, {
                //     Name: '',
                //     Addres: '',
                //     Country: '',
                //     Dateofbirth: '',
                //     Phone: '',
                //     Surname: '',
                //     City: '',
                //     Zip: '',
                //     Email: ''
                // }]
                // beneficial: [
                //     ...state.beneficial,
                //     {
                //         id: 1,
                //         data: {
                //             Name: '',
                //             Addres: '',
                //             Country: '',
                //             Dateofbirth: '',
                //             Phone: '',
                //             Surname: '',
                //             City: '',
                //             Zip: '',
                //             Email: ''
                //         }
                //     }
                // ]
                beneficial: {
                    ...state.beneficial,
                    1: {
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