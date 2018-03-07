const INITIAL_STATE = {
    individualUser: [
        {
            description: `Submit a personal identity document with photo: Passport, ID, Residence document (both sides)`,
            id: 'one_passport'
        },
        {
            description: 'Utility bill or any other document with a date no later than 2 months before the presentation (this confirms the address)',
            id: 'one_address'
        },
    ],
    legalEntityUserCompany: [
        {
            description: "Submit a director’s personal identity document: One of the following Passport, ID, Residence Document (both sides)",
            id: "director_personal"
        },
        {
            description: "Basis of representation (statute, letter of attorney, etc.)",
            id: "basis_representation"
        },
        {
            description: "If the company register of the country does not provide public data: Certificate of actual status. Upload a Certificate of actual status The certificate of actual status should be issued by the official Company register or a similar authorized institution in the country of registration of your company: the Certificate of actual status should contain: the company name, address, seat, registration number/ tax number or similar, Legal representatives (Managers) names, business activity. The document should be issued no more than 6 months before the date of upload. A document confirming the right to represent the company",
            id: "company_register_country"
        }],
    legalEntityAboutCompany: [
        {
            description: "Upload a Business registration document. Please upload a copy of ONE of the following types documents: a business registration; a bank statement (2 weeks old), a credit card statement, a utility bill, an insurance contract, a receipt for paid insurance, an invoice, or any other type of contract or document, which contains the company address, BULSTAT, VAT, Tax number",
            id: "business_registration_document"
        },
        {
            description: "The document should be no older than 3 months by the date of upload.)",
            id: "document_older_3"
        },
        {
            description: "Upload Business activity license requirement. If your business activity is subject to licensing and regulation by an independent authority (for instance, such business activities are: insurance, gambling (casinos, online casinos, other gaming activities), investment brokerage, advisory asset management, financial services, pharmaceutical products trade, precious metals trade, securities trade, etc.), please upload a copy of your company license or permit.",
            id: "business_activity_license"
        },
        {
            description: "If your business activity doesn’t require a business license, please confirm/Declare",
            id: "business_activity"
        }
    ],
    legalEntityBeneficial: [{
        description: "Upload a Declaration for the beneficial owner and copy of the ID document of the Legal Representative/s of the company",
        id: "declaration"
    },
        {
            description: "Confirm upload of declaration  (Beneficial owners declaration - the Beneficial owner (BO) of the company is a physical person, who has 25% or more than 25% of the company or otherwise exercises control over the company).",
            id: "confirm_declaration"
        },
        {
            description: "Copy of the ID Document (Passport or ID Card) of the Legal representative/s (Director/s, CEO/s, Manager/s or Owner of the business)",
            id: "copty_id_document"
        },
    ]
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
}