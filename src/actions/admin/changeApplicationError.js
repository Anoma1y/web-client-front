import { CHANGE_ADMIN_APPLICATION_SEND_ERROR } from './types';

export const changeApplicationError = value => ({
    type: CHANGE_ADMIN_APPLICATION_SEND_ERROR,
    payload: value
});
