import { CHANGE_INDIVIDUAL_USER_PROFILE } from './types';

export const changeIndividualUserProfile = value => ({
   type: CHANGE_INDIVIDUAL_USER_PROFILE,
   payload: value 
});