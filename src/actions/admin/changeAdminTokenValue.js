import { SET_ADMIN_TOKEN_VALUE } from './types';

export const changeAdminTokenValue = value => ({
    type: SET_ADMIN_TOKEN_VALUE,
    payload: value
});
