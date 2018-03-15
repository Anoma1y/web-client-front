import { SET_ADMIN_USER_SINGLE } from './types';

export const setUserSingle = value => ({
    type: SET_ADMIN_USER_SINGLE,
    payload: value
});
