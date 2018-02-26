import { DELETE_TOKEN_USER } from './types';

export const deleteToken = value => ({
    type: DELETE_TOKEN_USER,
    payload: value
});
