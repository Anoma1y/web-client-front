import { CHANGE_BENEFICIAL_INCREMENT_ID } from './types';

export const changeBeneficialIncrementID = value => ({
    type: CHANGE_BENEFICIAL_INCREMENT_ID,
    payload: value
});
