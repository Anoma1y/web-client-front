import { CHANGE_LEGAL_BENEFICIAL_IMAGE } from './types';

export const changeLegalBeneficialImage = value => ({
    type: CHANGE_LEGAL_BENEFICIAL_IMAGE,
    payload: value
});
