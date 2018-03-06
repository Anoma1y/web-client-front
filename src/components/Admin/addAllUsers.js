import { ADD_USERS } from './types';

export const adminAllUsers = value => ({
    type: ADD_USERS,
    payload: value
});
