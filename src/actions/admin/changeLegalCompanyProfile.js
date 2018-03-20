import { CHANGE_LEGAL_COMPANY_PROFILE } from './types';

export const changeLegalCompanyProfile = value => ({
    type: CHANGE_LEGAL_COMPANY_PROFILE,
    payload: value
});
