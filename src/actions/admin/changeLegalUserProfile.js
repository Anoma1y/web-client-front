import { CHANGE_LEGAL_USER_PROFILE } from './types';

export const changeLegalUserProfile = value => ({
    type: CHANGE_LEGAL_USER_PROFILE,
    payload: value
});
