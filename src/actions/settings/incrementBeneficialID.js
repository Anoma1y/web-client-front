import { INCREMENT_BENEFICIAL_ID } from './types';

export const incrementBeneficialID = value => ({
   type: INCREMENT_BENEFICIAL_ID,
   payload: value 
});