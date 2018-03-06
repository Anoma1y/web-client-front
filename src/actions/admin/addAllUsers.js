import { ADD_USERS } from './types';

export const addAllUsers = value => ({
    type: ADD_USERS,
    payload: value
});
