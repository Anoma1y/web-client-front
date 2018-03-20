import { CHANGE_LEGAL_COMPANY_IMAGE } from './types';

export const changeLegalCompanyImage = value => ({
    type: CHANGE_LEGAL_COMPANY_IMAGE,
    payload: value
});
