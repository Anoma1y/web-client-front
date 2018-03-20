import { CHANGE_LEGAL_BENEFICIAL_PROFILE } from './types';

export const changeLegalBeneficialProfile = value => ({
    type: CHANGE_LEGAL_BENEFICIAL_PROFILE,
    payload: value
});
