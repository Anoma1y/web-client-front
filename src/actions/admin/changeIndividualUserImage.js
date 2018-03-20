import { CHANGE_INDIVIDUAL_USER_IMAGE } from './types';

export const changeIndividualUserImage = value => ({
   type: CHANGE_INDIVIDUAL_USER_IMAGE,
   payload: value 
});