import { CHANGE_DELETE_USERS } from './types';

export const changeDeleteUsers = value => ({
    type: CHANGE_DELETE_USERS,
    payload: value
});
