import { SET_ADMIN_USER_KYC } from './types';

export const setUserKYC = value => ({
    type: SET_ADMIN_USER_KYC,
    payload: value
});
