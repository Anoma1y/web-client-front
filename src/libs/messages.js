export const ERROR_VALIDATION = {
    ENGLISH: 'Enter only English alphabet characters',
    NUMBER: 'Enter numbers only',
    PHONE: 'Enter valid phone number',
    EMAIL: 'Please enter a valid Email',
    ZIP: 'Enter only English alphabet characters or numbers',
    ZIPLENGTH: '4 symbols minimum',
    URL: 'Enter valid web address',
    PASSWORD_MATCH: "Passwords do not match",
    PASSWORD_NEW: "Enter a new password",
    TOKEN: "Invalid Token",
};

export const ERROR_IMAGE = {
    SIZE: 'Maximum file size is 25MB',
    FORMAT: 'Allowed file types: png, jpg, gif, tiff',
};

export const SETTINGS = {
    SUCCESS: 'We have received your details, thank you. We’ll review all KYC requests together with approving applications. So if you receive a link to pay for your applications that means you successfully passed the KYC procedure. Please note that we might ask you to share some additional details.',
    FILL_INPUT: 'Please fill in all required fields',
    VALID_INPUT: 'Please correct the highlighted fields'
};

export const CALCULATOR = {
    MAXIMUM_ERROR: 'You\'ve reached the limit',
    APPLICATION_LIMIT: 'To proceed please contact us',
    ORDER: {
        TITLE: 'Thank you for the application!',
        TEXT: 'We\'ll approve or decline all applications before April 9th. We\'ll send you an email, or you can view all approved applications in your TransCrypt tokensale account.',
        NOTE: 'Please note that the number of tokens bought will be calculated after we receive the funds, not at the moment they were sent. The final amount can change due to exchange rate fluctuations.'
    }
};

export const BETATEST = {
    SUCCESS: 'Your application has been sent',
    ALREADY_SUBSCRIBE: 'You are already subscribed'
};

export const SIGNUP_SUCCESS = {
    START: 'We\'ve sent a message to',
    FINISH: 'Please check your mail and click activate account to confirm email.'
};

export const RESET_USER = {
    TITLE: ' Forgot your password?',
    RESET_TEXT: 'No problem! Just fill in the email below and we\'ll send you password reset instructions!',
    CONFIRM_EMAIL: 'Password Recovery',
    CHECK_EMAIL: 'Please check your inbox for an email with instructions for how to reset your password',
    NEW_PASSWORD_TITLE: 'New Password',
    NEW_PASSWORD_TEXT: 'Create a new password'
};

export const INDIVIDUAL_USER_DOCUMENT = [
    {
        DESCRIPTION: `Submit a personal identity document with photo: Passport, ID, Residence document (both sides)`,
        ID: 'personalUserDocument',
        OBJECT_FILE: 'individualUserFile'
    },
    {
        DESCRIPTION: 'Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)',
        ID: 'utilityBill',
        OBJECT_FILE: 'individualUserFile'
    }
];

export const PERSON_COMPANY_DOCUMENT = [
    {
        DESCRIPTION: 'Submit a director’s personal identity document: One of the following Passport, ID, Residence Document (both sides)',
        ID: 'personalUserCompanyDocument',
        OBJECT_FILE: 'personCompanyFile'
    },
    {
        DESCRIPTION: 'Basis of representation (statute, letter of attorney, etc.)',
        ID: 'representation',
        OBJECT_FILE: 'personCompanyFile'
    },
    {
        DESCRIPTION: 'If the company register of the country does not provide public data: Certificate of actual status. Upload a Certificate of actual status The certificate of actual status should be issued by the official Company register or a similar authorized institution in the country of registration of your company: the Certificate of actual status should contain: the company name, address, seat, registration number/ tax number or similar, Legal representatives (Managers) names, business activity. The document should be issued no more than 6 months before the date of upload. A document confirming the right to represent the company',
        ID: 'certificateActualStatus',
        OBJECT_FILE: 'personCompanyFile'
    }
];

export const COMPANY_DOCUMENT = [
    {
        DESCRIPTION: 'Upload a Business registration document. Please upload a copy of ONE of the following types documents: a business registration; a bank statement (2 weeks old), a credit card statement, a utility bill, an insurance contract, a receipt for paid insurance, an invoice, or any other type of contract or document, which contains the company address, BULSTAT, VAT, Tax number',
        ID: 'businessRegistrationDocument',
        OBJECT_FILE: 'companyFile'
    },{
        DESCRIPTION: 'The document should be no older than 3 months by the date of upload.)',
        ID: 'document3months',
        OBJECT_FILE: 'companyFile'
    },{
        DESCRIPTION: 'Upload Business activity license requirement. If your business activity is subject to licensing and regulation by an independent authority (for instance, such business activities are: insurance, gambling (casinos, online casinos, other gaming activities), investment brokerage, advisory asset management, financial services, pharmaceutical products trade, precious metals trade, securities trade, etc.), please upload a copy of your company license or permit.',
        ID: 'businessActivityLicense',
        OBJECT_FILE: 'companyFile'
    },{
        DESCRIPTION: 'If your business activity doesn’t require a business license, please confirm/Declare',
        ID: 'declare',
        OBJECT_FILE: 'companyFile'
    }
];

export const BENEFICIAL_DOCUMENT = [
    {
        DESCRIPTION: 'Upload a Declaration for the beneficial owner and copy of the ID document of the Legal Representative/s of the company',
        ID: 'personalBeneficialDocument',
        OBJECT_FILE: 'beneficialFile'
    },{
        DESCRIPTION: 'Confirm upload of declaration  (Beneficial owners declaration - the Beneficial owner (BO) of the company is a physical person, who has 25% or more than 25% of the company or otherwise exercises control over the company).',
        ID: 'declarationBeneficialOwned',
        OBJECT_FILE: 'beneficialFile'
    },{
        DESCRIPTION: 'Copy of the ID Document (Passport or ID Card) of the Legal representative/s (Director/s, CEO/s, Manager/s or Owner of the business)',
        ID: 'legalRepresentative',
        OBJECT_FILE: 'beneficialFile'
    }
];