import { SET_ADMIN_APPLICATION_SINGLE } from './types';

export const setApplicationSingle = value => ({
    type: SET_ADMIN_APPLICATION_SINGLE,
    payload: value
});
