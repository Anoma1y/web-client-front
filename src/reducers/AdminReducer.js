import * as A from 'actions/admin/types';

const INITIAL_STATE = {
    usersList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    applicationList: {
        data: [],
        column: null,
        direction: 'descending'
    },
    singleApplication: {
        CreatedAt: null,
        ID: null,
        amount: 0,
        currency: '',
        comment: '',
        profile: {
            ID: null,
            CreatedAt: null,
            email: '',
            is_kyc_passed: null,
            is_verified: null,
            kyc_type: null,
            roles: ''
        },
        status: null
    },
    singleUser: {
        CreatedAt: null,
        ID: null,
        email: null,
        is_kyc_passed: null,
        is_verified: null,
        kyc_type: null,
        kyc_id: null,
        roles: null
    },
    singleUserKYC: {
        CreatedAt: null,
        ID: null,
        content: null,
        profile_id: null,
        status: null,
        type: null
    },
    individualUserImage: {
        personalUserDocument: '',
        utilityBill: ''
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
    deleteUsers: [],
    deleteApplications: [],
    userRole: null,
    applicationStatus: null,
    bonus: [
        {
            value: 2.5,
            limit: 100000,
            active: false
        },{
            value: 5,
            limit: 500000,
            active: false
        },{
            value: 10,
            limit: 1000000,
            active: false
        },{
            value: 15,
            limit: 2000000,
            active: false
        }
    ],
    currentBonus: 0,
    progressBar: {
        percent: 0,
        isMaximum: false
    },
    currencyValue: 'ETH',
    sumValue: 0,
    tokenValue: 10000,
    fixedCurrency: 'TSR/ETH',
    transferData: {
        USD: 0,
        TSR: 0,
        BTC: 0,
        ETH: 0
    },
    applicationModalIsOpen: false,
    applicationChangeError: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case A.ADD_USERS:
            return { ...state, usersList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case A.ADD_APPLICATION:
            return { ...state, applicationList: {
                data: action.payload,
                column: null,
                direction: 'descending'
            } };
        case A.CHANGE_ADMIN_OPEN_MODAL:
            return { ...state, applicationModalIsOpen: action.payload };
        case A.CHANGE_ADMIN_APPLICATION_SEND_ERROR:
            return { ...state, applicationChangeError: action.payload };
        case A.SORTED_USERS:
            return { ...state, usersList: action.payload };
        case A.SORTED_APPLICATIONS:
            return { ...state, applicationList: action.payload };
        case A.CHANGE_DELETE_USERS:
            return { ...state, deleteUsers: action.payload };
        case A.CHANGE_DELETE_APPLICATIONS:
            return { ...state, deleteApplications: action.payload };
        case A.CHANGE_USER_ROLE:
            return { ...state, userRole: action.payload };
        case A.CHANGE_APPLICATION_STATUS:
            return { ...state, applicationStatus: action.payload };
        case A.CHANGE_FIXED_CURRENCY:
            return { ...state, fixedCurrency: action.payload };
        case A.SET_ADMIN_CURRENTCURRENCY:
            return { ...state, currencyValue: action.payload };
        case A.SET_ADMIN_CURRENCY_VALUE:
            return { ...state, sumValue: action.payload };
        case A.SET_ADMIN_TOKEN_VALUE:
            return { ...state, tokenValue: action.payload };
        case A.CHANGE_INDIVIDUAL_USER_IMAGE:
            return { ...state, individualUserImage: action.payload };
        case A.CHANGE_INDIVIDUAL_USER_PROFILE:
            return { ...state, individualUserInformation: action.payload };
        case A.CHANGE_LEGAL_USER_PROFILE:
            return { ...state,  companyUserInformation: action.payload };
        case A.CHANGE_LEGAL_USER_IMAGE:
            return { ...state,  companyUserImage: action.payload };
        case A.CHANGE_LEGAL_COMPANY_PROFILE:
            return { ...state,  companyInformation: action.payload };
        case A.CHANGE_LEGAL_COMPANY_IMAGE:
            return { ...state,  companyImage: action.payload };
        case A.CHANGE_LEGAL_BENEFICIAL_PROFILE:
            return { ...state,  beneficial: action.payload };
        case A.CHANGE_LEGAL_BENEFICIAL_IMAGE:
            return { ...state,  beneficialImage: action.payload };
        case A.CHANGE_LEGAL_SOURCE_FUNDS:
            return { ...state, sourceFunds: action.payload };
        case A.CHANGE_BENEFICIAL_INCREMENT_ID:
            return { ...state, idBeneficial: action.payload };
        case A.SET_ADMIN_CURRENT_BONUS:
            return { ...state, currentBonus: action.payload };
        case A.SET_ADMIN_TRANSFER_DATA:
            const {
                sumValue,
                progressBar,
                tokenValue,
                bonus,
                currentBonus,
                transferData
            } = action.payload;
            return { ...state,  sumValue, progressBar, tokenValue, bonus, currentBonus, transferData };
        case A.SET_ADMIN_APPLICATION_SINGLE:
            return { ...state, singleApplication: action.payload };
        case A.SET_ADMIN_USER_SINGLE:
            return { ...state, singleUser: action.payload };
        case A.SET_ADMIN_USER_KYC:
            return { ...state, singleUserKYC: action.payload };
        default:
            return state;
    }
}